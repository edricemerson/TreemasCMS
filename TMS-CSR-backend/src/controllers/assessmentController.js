const pool = require('../config/db');

// =======================================================
// A. SISI USER (MENGISI FORM & LIHAT HASIL)
// =======================================================

const getQuestions = async (req, res) => {
    try {
        const groupsRes = await pool.query('SELECT * FROM assessment_group ORDER BY sequence ASC');
        const subgroupsRes = await pool.query('SELECT * FROM assessment_subgroup ORDER BY sequence ASC');
        const categoriesRes = await pool.query('SELECT * FROM assessment_categorie ORDER BY sequence ASC');
        const questionsRes = await pool.query('SELECT * FROM assessment_question ORDER BY sequence ASC');
        const optionsRes = await pool.query('SELECT * FROM assessment_option ORDER BY sequence ASC');

        const groups = groupsRes.rows;
        const subgroups = subgroupsRes.rows;
        const categories = categoriesRes.rows;
        const questions = questionsRes.rows;
        const options = optionsRes.rows;

        const data = groups.map(group => ({
            id: group.id,
            name: group.name,
            subgroups: subgroups.filter(sub => sub.group_id === group.id).map(sub => ({
                id: sub.id,
                name: sub.name,
                categories: categories.filter(cat => cat.subgroup_id === sub.id).map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    questions: questions.filter(q => q.category_id === cat.id).map(q => ({
                        id: q.id,
                        text: q.question_text, 
                        options: options.filter(opt => opt.question_id === q.id).map(opt => ({
                            id: opt.id,
                            label: opt.option_text, 
                            score: parseFloat(opt.points),
                            type: opt.option_type || "" // 🔴 PERBAIKAN: Mengirimkan status tipe agar checkbox di UI tidak reset / tertukar
                        }))
                    }))
                }))
            }))
        }));

        res.json({ success: true, data: data });
    } catch (error) {
        console.error('Error getQuestions:', error);
        res.status(500).json({ success: false, error: 'Gagal mengambil data soal.' });
    }
};

const submitAssessment = async (req, res) => {
    const client = await pool.connect(); 
    try {
        const { business_profile_id, answers } = req.body;
        if (!business_profile_id || !answers || !Array.isArray(answers)) {
            return res.status(400).json({ error: 'Data tidak lengkap atau format salah' });
        }

        await client.query('BEGIN'); 
        const resultHeader = await client.query(
            `INSERT INTO assessment_results (business_profile_id, total_score, status) VALUES ($1, 0, 'Selesai Mengisi Assessment') RETURNING id`,
            [business_profile_id]
        );
        const resultId = resultHeader.rows[0].id;
        
        let totalScore = 0;
        for (const answer of answers) {
            const optRes = await client.query('SELECT points FROM assessment_option WHERE id = $1', [answer.selected_option_id]);
            const earnedPoint = optRes.rows.length > 0 ? parseFloat(optRes.rows[0].points) : 0;
            totalScore += earnedPoint;

            await client.query(
                `INSERT INTO assessment_user_answer (result_id, question_id, selected_option_id, earned_point) VALUES ($1, $2, $3, $4)`,
                [resultId, answer.question_id, answer.selected_option_id, earnedPoint] 
            );
        }

        await client.query(`UPDATE assessment_results SET total_score = $1 WHERE id = $2`, [totalScore, resultId]);
        await client.query(
            `INSERT INTO assessment_report (business_profile_id, result_id, insight) VALUES ($1, $2, $3)`,
            [business_profile_id, resultId, '']
        )
        await client.query('COMMIT');
        res.status(201).json({ success: true, message: 'Assessment berhasil disimpan!', resultId: resultId });
    } catch (error) {
        await client.query('ROLLBACK'); 
        console.error('Error submitAssessment:', error);
        res.status(500).json({ success: false, error: 'Gagal menyimpan jawaban.' });
    } finally {
        client.release();
    }
};

const getAssessmentResult = async (req, res) => {
    try {
        const { resultId } = req.params;

        // 1. Ambil data Header Profil Bisnis
        const headerQuery = `
            SELECT bp.nama_umkm, bp.produk_utama, bp.business_type, bp.company_size_id, bp.provinsi, ar.created_at, ar.status
            FROM assessment_results ar
            JOIN business_profiles bp ON ar.business_profile_id = bp.id
            WHERE ar.id = $1
        `;
        const headerRes = await pool.query(headerQuery, [resultId]);
        if (headerRes.rows.length === 0) return res.status(404).json({ success: false, message: 'Data assessment not found' });
        const headerData = headerRes.rows[0];

        const answerQuery = `
            SELECT 
                g.name AS section_name, 
                sg.id AS subgroup_id,
                sg.name AS subsection_name, 
                c.name AS category_name,    
                ans.earned_point
            FROM assessment_user_answer ans
            JOIN assessment_question q ON ans.question_id = q.id
            JOIN assessment_categorie c ON q.category_id = c.id
            JOIN assessment_subgroup sg ON c.subgroup_id = sg.id
            JOIN assessment_group g ON sg.group_id = g.id
            WHERE ans.result_id = $1 AND ans.earned_point IS NOT NULL
        `;
        const answerRes = await pool.query(answerQuery, [resultId]);
        const rows = answerRes.rows;

        // --- HELPER FUNCTIONS ---
        const avg = (arr) => arr.length > 0 ? arr.reduce((sum, val) => sum + val, 0) / arr.length : 0;
        
        const to100 = (skor, use_100) => {
            if (skor <= 0) return 0;
            let result = use_100 ? Math.round(skor) : Math.round(((skor - 1) / 3) * 100);
            return Math.min(Math.max(result, 0), 100); 
        };

        const getLabel = (skor100) => {
            if (skor100 >= 85) return "Sangat Bagus";
            if (skor100 >= 70) return "Bagus";
            if (skor100 >= 55) return "Cukup";
            if (skor100 >= 40) return "Kurang";
            return "Sangat Kurang";
        };

        // --- GROUPING DATA ---
        const structure = {};
        rows.forEach(r => {
            const secName = r.section_name;
            const subName = r.subsection_name;
            const subId = r.subgroup_id; 
            const catName = r.category_name; 
            const point = parseFloat(r.earned_point);

            if (!structure[secName]) {
                let pillar = 'Core Drivers';
                if (secName.toLowerCase().includes('strategic')) pillar = 'Strategic Value';
                else if (secName.toLowerCase().includes('financial')) pillar = 'Financial Health';
                
                structure[secName] = { name: secName, pillar: pillar, subgroups: {} };
            }
            
            if (!structure[secName].subgroups[subName]) {
                structure[secName].subgroups[subName] = { 
                    id: subId, 
                    categories: {} 
                };
            }
            
            if (!structure[secName].subgroups[subName].categories[catName]) {
                structure[secName].subgroups[subName].categories[catName] = [];
            }
            
            structure[secName].subgroups[subName].categories[catName].push(point); 
        });

        // --- CALCULATE SCORES ---
        const detailMetrics = { strategic: [], financial: [], core: [] };
        
        let strategicSubScores = [];
        let financialSubScores = [];
        let coreSubScores = [];

        for (const [secName, sec] of Object.entries(structure)) {
            const use_100 = sec.pillar === 'Financial Health';

            for (const [subName, sub] of Object.entries(sec.subgroups)) {
                let subPoints = [];
                const currentSubId = sub.id; //
                let categoryAverages = []; // raw 1-4 avg per category, for subgroup rollup

                for (const [catName, pointsArray] of Object.entries(sub.categories)) {
                    let rawCatAvg = avg(pointsArray);
                    if (rawCatAvg === 0) continue;

                    subPoints.push(...pointsArray);
                    categoryAverages.push(rawCatAvg);

                    if (sec.pillar !== 'Core Drivers') {
                        let catScore = use_100 ? (rawCatAvg / 4) * 100 : rawCatAvg;
                        const finalScore100 = to100(catScore, use_100);
                        const statusLbl = getLabel(finalScore100);

                        const detailObj = {
                            metrik: catName,
                            subgroup: subName,
                            subgroup_id: currentSubId,
                            skor: finalScore100,
                            status: statusLbl
                        };

                        if (sec.pillar === 'Strategic Value') detailMetrics.strategic.push(detailObj);
                        else if (sec.pillar === 'Financial Health') detailMetrics.financial.push(detailObj);
                    }
                }

                // Core Drivers: one row per subgroup = avg of category averages, rounded down
                if (sec.pillar === 'Core Drivers' && categoryAverages.length > 0) {
                    const subgroupRawAvg = avg(categoryAverages);
                    const subgroupPercent = Math.min(Math.max(Math.floor(((subgroupRawAvg - 1) / 3) * 100), 0), 100);

                    detailMetrics.core.push({
                        metrik: subName,
                        subgroup: subName,
                        subgroup_id: currentSubId,
                        skor: subgroupPercent,
                        status: getLabel(subgroupPercent)
                    });
                }

                let rawSubAvg = avg(subPoints);
                if (rawSubAvg > 0) {
                    let subScore = use_100 ? (rawSubAvg / 4) * 100 : rawSubAvg;

                    if (sec.pillar === 'Strategic Value') strategicSubScores.push(subScore);
                    else if (sec.pillar === 'Financial Health') financialSubScores.push(subScore);
                    else if (sec.pillar === 'Core Drivers') coreSubScores.push(subScore);
                }
            }
        }

        // --- RATA-RATA UTAMA PER PILAR ---
        let strategicScore = avg(strategicSubScores); 
        let financialScore = avg(financialSubScores); 
        let coreScore = avg(coreSubScores);           

        // --- CALCULATE BHI ---
        const sv100 = to100(strategicScore, false);
        const fh100 = to100(financialScore, true);
        const cd100 = to100(coreScore, false);

        const bhiScore = Math.min(Math.max(Math.round((sv100 + fh100 + cd100) / 3), 0), 100); 
        const bhiLabel = getLabel(bhiScore);

        // --- SAVE TOTAL SCORE TO DB ---
        await pool.query(`UPDATE assessment_results SET total_score = $1 WHERE id = $2`, [bhiScore, resultId]);

        // --- CONSTRUCT FINAL JSON PAYLOAD ---
        res.json({
            success: true,
            data: {
                company_info: {
                    name: headerData.nama_umkm,
                    industry: headerData.business_type || '-',
                    location: headerData.provinsi || '-',
                    employees: headerData.company_size_id || '-',
                    report_date: headerData.created_at
                },
                bhi_summary: {
                    score: bhiScore || 0,
                    status: bhiLabel
                },
                pillar_scores: {
                    strategic_value: { score: sv100, status: getLabel(sv100) },
                    financial_health: { score: fh100, status: getLabel(fh100) },
                    core_drivers: { score: cd100, status: getLabel(cd100) }
                },
                detail_metrics: detailMetrics 
            }
        });
    } catch (error) {
        console.error('Error getAssessmentResult:', error);
        res.status(500).json({ success: false, error: 'Gagal menghitung hasil.' });
    }
};

const getAllResult = async (req, res) => {
    try {
        // Menggunakan LEFT JOIN agar perusahaan yang HANYA mengisi form tetap terbaca
        const query = `
            SELECT 
                b.id AS profile_id, 
                r.id AS result_id,
                b.nama_umkm AS company_name, 
                b.email, 
                b.nomor_telepon AS phone,
                r.total_score, 
                CASE 
                    WHEN r.id IS NULL THEN 'Baru Mengisi Form'
                    ELSE r.status 
                END as status,
                COALESCE(r.created_at, b.created_at) AS sort_date,
                r.created_at AS assessment_date
            FROM business_profiles b 
            LEFT JOIN assessment_results r ON b.id = r.business_profile_id 
            ORDER BY sort_date DESC
        `;
        const result = await pool.query(query);
        res.json({ success: true, data: result.rows });
    } catch (error){
        console.error('ERROR getAllResults', error);
        res.status(500).json({success:false, error: 'failed retrieving dashboard data'});
    }
};

const getProfileDetail = async (req, res) => {
    try {
        const { profileId } = req.params;

        const query = `
            SELECT
                b.id AS profile_id,
                b.nama_umkm AS company_name,
                b.business_type,
                b.provinsi AS location,
                b.company_size_id AS team_size,
                b.how_far_along AS ideation,
                b.email,
                r.id AS result_id,
                r.total_score,
                rep.id AS report_id,
                COALESCE(r.created_at, b.created_at) AS report_date,
                rep.insight,
                CASE
                    WHEN max_s.max_total > 0
                    THEN ROUND((COALESCE(r.total_score, 0)::numeric / max_s.max_total) * 100)
                    ELSE 0
                END AS bhi_score
            FROM business_profiles b
            LEFT JOIN assessment_results r ON b.id = r.business_profile_id
            LEFT JOIN assessment_report rep ON r.id = rep.result_id
            CROSS JOIN (
                SELECT COALESCE(SUM(max_pts), 0) AS max_total
                FROM (
                    SELECT MAX(o.points::numeric) AS max_pts
                    FROM assessment_option o
                    JOIN assessment_question q ON o.question_id = q.id
                    WHERE (o.option_type IS NULL OR o.option_type != 'no-point')
                    GROUP BY q.id
                ) AS sub
            ) AS max_s
            WHERE b.id = $1
        `;
        const result = await pool.query(query, [profileId]);
        
        if(result.rows.length === 0) {
            return res.status(404).json({success: false, message: "Profile not found"});
        }

        const profileData = result.rows[0];

        // Set default value jika perusahaan belum pernah mengisi kuesioner
        profileData.bhi_summary = null;
        profileData.pillar_scores = null;
        profileData.detail_metrics = null;

        if (profileData.result_id) {
            const answerQuery = `
                SELECT 
                    g.name AS section_name, 
                    sg.id AS subgroup_id,       
                    sg.name AS subsection_name, 
                    c.name AS category_name,    
                    ans.earned_point
                FROM assessment_user_answer ans
                JOIN assessment_question q ON ans.question_id = q.id
                JOIN assessment_categorie c ON q.category_id = c.id
                JOIN assessment_subgroup sg ON c.subgroup_id = sg.id
                JOIN assessment_group g ON sg.group_id = g.id
                WHERE ans.result_id = $1 AND ans.earned_point IS NOT NULL
            `;
            const answerRes = await pool.query(answerQuery, [profileData.result_id]);
            const rows = answerRes.rows;

            // --- HELPER FUNCTIONS ---
            const avg = (arr) => arr.length > 0 ? arr.reduce((sum, val) => sum + val, 0) / arr.length : 0;
            const to100 = (skor, use_100) => {
                if (skor <= 0) return 0;
                let resSkor = use_100 ? Math.round(skor) : Math.round(((skor - 1) / 3) * 100);
                return Math.min(Math.max(resSkor, 0), 100); 
            };
            const getLabel = (skor100) => {
                if (skor100 >= 85) return "Sangat Bagus";
                if (skor100 >= 70) return "Bagus";
                if (skor100 >= 55) return "Cukup";
                if (skor100 >= 40) return "Kurang";
                return "Sangat Kurang";
            };

            // --- GROUPING DATA ---
            const structure = {};
            rows.forEach(r => {
                const secName = r.section_name;
                const subName = r.subsection_name;
                const subId = r.subgroup_id; 
                const catName = r.category_name; 
                const point = parseFloat(r.earned_point);

                if (!structure[secName]) {
                    let pillar = 'Core Drivers';
                    if (secName.toLowerCase().includes('strategic')) pillar = 'Strategic Value';
                    else if (secName.toLowerCase().includes('financial')) pillar = 'Financial Health';
                    
                    structure[secName] = { name: secName, pillar: pillar, subgroups: {} };
                }
                
                if (!structure[secName].subgroups[subName]) structure[secName].subgroups[subName] = { id: subId, categories: {} };
                if (!structure[secName].subgroups[subName].categories[catName]) structure[secName].subgroups[subName].categories[catName] = [];
                
                structure[secName].subgroups[subName].categories[catName].push(point); 
            });

            // --- CALCULATE SCORES ---
            const detailMetrics = { strategic: [], financial: [], core: [] };
            let strategicSubScores = [], financialSubScores = [], coreSubScores = [];

            for (const [secName, sec] of Object.entries(structure)) {
                const use_100 = sec.pillar === 'Financial Health';

                for (const [subName, sub] of Object.entries(sec.subgroups)) {
                    let subPoints = [];
                    const currentSubId = sub.id;
                    let categoryAverages = []; // raw 1-4 avg per category, for subgroup rollup

                    for (const [catName, pointsArray] of Object.entries(sub.categories)) {
                        let rawCatAvg = avg(pointsArray);
                        if (rawCatAvg === 0) continue;

                        subPoints.push(...pointsArray);
                        categoryAverages.push(rawCatAvg);

                        if (sec.pillar !== 'Core Drivers') {
                            let catScore = use_100 ? (rawCatAvg / 4) * 100 : rawCatAvg;
                            const finalScore100 = to100(catScore, use_100);
                            const statusLbl = getLabel(finalScore100);

                            const detailObj = {
                                metrik: catName,
                                subgroup: subName,
                                subgroup_id: currentSubId,
                                skor: finalScore100,
                                status: statusLbl
                            };

                            if (sec.pillar === 'Strategic Value') detailMetrics.strategic.push(detailObj);
                            else if (sec.pillar === 'Financial Health') detailMetrics.financial.push(detailObj);
                        }
                    }

                    // Core Drivers: one row per subgroup = avg of category averages, rounded down
                    if (sec.pillar === 'Core Drivers' && categoryAverages.length > 0) {
                        const subgroupRawAvg = avg(categoryAverages);
                        const subgroupPercent = Math.min(Math.max(Math.floor(((subgroupRawAvg - 1) / 3) * 100), 0), 100);

                        detailMetrics.core.push({
                            metrik: subName,
                            subgroup: subName,
                            subgroup_id: currentSubId,
                            skor: subgroupPercent,
                            status: getLabel(subgroupPercent)
                        });
                    }

                    let rawSubAvg = avg(subPoints);
                    if (rawSubAvg > 0) {
                        let subScore = use_100 ? (rawSubAvg / 4) * 100 : rawSubAvg;
                        if (sec.pillar === 'Strategic Value') strategicSubScores.push(subScore);
                        else if (sec.pillar === 'Financial Health') financialSubScores.push(subScore);
                        else if (sec.pillar === 'Core Drivers') coreSubScores.push(subScore);
                    }
                }
            }

            let strategicScore = avg(strategicSubScores); 
            let financialScore = avg(financialSubScores); 
            let coreScore = avg(coreSubScores);           

            const sv100 = to100(strategicScore, false);
            const fh100 = to100(financialScore, true);
            const cd100 = to100(coreScore, false);
            const bhiScore = Math.min(Math.max(Math.round((sv100 + fh100 + cd100) / 3), 0), 100); 

            profileData.bhi_summary = { score: bhiScore, status: getLabel(bhiScore) };
            profileData.pillar_scores = {
                strategic_value: { score: sv100, status: getLabel(sv100) },
                financial_health: { score: fh100, status: getLabel(fh100) },
                core_drivers: { score: cd100, status: getLabel(cd100) }
            };
            profileData.detail_metrics = detailMetrics;
            
            profileData.total_score = bhiScore; 
        }

        delete profileData.result_id;

        res.json({success: true, data: profileData});
    } catch(error) {
        console.error('Error getProfileDetail:', error);
        res.status(500).json({success: false, error: 'failed retrieving profile data'});
    }
};



const saveInsight = async (req, res) => {
    try {
        const { resultId } = req.params;
        const { insight } = req.body;

        await pool.query(
            `UPDATE assessment_report SET insight = $1 WHERE result_id = $2`,
            [insight, resultId]
        );
        res.json({ success: true, message: 'Insight saved successfully!' });
    } catch (error) {
        console.error('Error saveInsight:', error);
        res.status(500).json({ success: false, error: 'Failed to save insight.' });
    }
}
// =======================================================
// B. SISI ADMIN CMS (CRUD KUESIONER BUILDER)
// =======================================================

// 1. Group
const addGroup = async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO assessment_group (name, sequence) VALUES ($1, $2) RETURNING *', [req.body.name, req.body.sequence || 0]);
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const updateGroup = async (req, res) => {
    try {
        await pool.query('UPDATE assessment_group SET name = $1 WHERE id = $2', [req.body.name, req.params.id]);
        res.status(200).json({ success: true, message: "Group updated!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const deleteGroup = async (req, res) => {
    try {
        await pool.query('DELETE FROM assessment_group WHERE id = $1', [req.params.id]);
        res.status(200).json({ success: true, message: "Group deleted!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// 2. Subgroup
const addSubgroup = async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO assessment_subgroup (group_id, name, sequence) VALUES ($1, $2, $3) RETURNING *', [req.body.group_id, req.body.name, req.body.sequence || 0]);
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const updateSubgroup = async (req, res) => {
    try {
        await pool.query('UPDATE assessment_subgroup SET name = $1 WHERE id = $2', [req.body.name, req.params.id]);
        res.status(200).json({ success: true, message: "Subgroup updated!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const deleteSubgroup = async (req, res) => {
    try {
        await pool.query('DELETE FROM assessment_subgroup WHERE id = $1', [req.params.id]);
        res.status(200).json({ success: true, message: "Subgroup deleted!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// 3. Category
const addCategory = async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO assessment_categorie (subgroup_id, name, sequence) VALUES ($1, $2, $3) RETURNING *', [req.body.subgroup_id, req.body.name, req.body.sequence || 0]);
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const updateCategory = async (req, res) => {
    try {
        await pool.query('UPDATE assessment_categorie SET name = $1 WHERE id = $2', [req.body.name, req.params.id]);
        res.status(200).json({ success: true, message: "Category updated!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const deleteCategory = async (req, res) => {
    try {
        await pool.query('DELETE FROM assessment_categorie WHERE id = $1', [req.params.id]);
        res.status(200).json({ success: true, message: "Category deleted!" });
    } catch (error) { res.status(500).json({ success: false, message: message.error }); }
};

// 4. Question
const addQuestion = async (req, res) => {
    try {
        const result = await pool.query('INSERT INTO assessment_question (category_id, question_text, sequence) VALUES ($1, $2, $3) RETURNING *', [req.body.category_id, req.body.question_text, req.body.sequence || 0]);
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const updateQuestion = async (req, res) => {
    try {
        await pool.query('UPDATE assessment_question SET question_text = $1 WHERE id = $2', [req.body.question_text, req.params.id]);
        res.status(200).json({ success: true, message: "Question updated!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const deleteQuestion = async (req, res) => {
    try {
        await pool.query('DELETE FROM assessment_question WHERE id = $1', [req.params.id]);
        res.status(200).json({ success: true, message: "Question deleted!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// 5. Option (Jawaban & Poin)
const addOption = async (req, res) => {
    try {
        // 🔴 PERBAIKAN: Menyimpan properti option_type saat opsi dibuat baru
        const result = await pool.query(
            'INSERT INTO assessment_option (question_id, option_text, points, sequence, option_type) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [req.body.question_id, req.body.option_text, req.body.points || 0, req.body.sequence || 0, req.body.option_type || '']
        );
        res.status(201).json({ success: true, data: result.rows[0] });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const updateOption = async (req, res) => {
    try {
        // 🔴 PERBAIKAN: Mengupdate properti option_type agar status "no-answer" / "no-point" tersimpan permanen ke database
        await pool.query(
            'UPDATE assessment_option SET option_text = $1, points = $2, option_type = $3 WHERE id = $4', 
            [req.body.option_text, req.body.points, req.body.option_type || '', req.params.id]
        );
        res.status(200).json({ success: true, message: "Option updated!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};
const deleteOption = async (req, res) => {
    try {
        await pool.query('DELETE FROM assessment_option WHERE id = $1', [req.params.id]);
        res.status(200).json({ success: true, message: "Option deleted!" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

module.exports = {
    getQuestions, submitAssessment, getAssessmentResult, getAllResult,
    addGroup, updateGroup, deleteGroup,
    addSubgroup, updateSubgroup, deleteSubgroup,
    addCategory, updateCategory, deleteCategory,
    addQuestion, updateQuestion, deleteQuestion,
    addOption, updateOption, deleteOption, getProfileDetail, saveInsight,
};