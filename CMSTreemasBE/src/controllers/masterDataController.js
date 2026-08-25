const pool = require('../config/db');

const allowedCategories = [
    'provinces', 
    'business_types', 
    'company_sizes', 
    'business_maturities', 
    'revenue_ranges'
];

const categoryMap = {
    'province': 'provinces',
    'business-type': 'business_types',
    'company-size': 'company_sizes',
    'business-maturity': 'business_maturities',
    'annual-revenue': 'revenue_ranges'
};

const getAllData = async (req, res) => {
    try {
        const type = req.query.type || req.params.table; 


        if (type) {
            const category = categoryMap[type] || type;

            if (!allowedCategories.includes(category)) {
                return res.status(403).json({ success: false, message: "Tipe master data tidak valid!" });
            }

            const query = `SELECT * FROM cms_master_data WHERE category = $1 ORDER BY sequence ASC, id ASC`;
            const result = await pool.query(query, [category]);
            
            return res.json({ success: true, data: result.rows });
        }

        const query = `SELECT * FROM cms_master_data ORDER BY category ASC, sequence ASC, id ASC`;
        const result = await pool.query(query);

        const allData = {};
        
        allowedCategories.forEach(cat => {
            allData[cat] = [];
        });
 
        result.rows.forEach(row => {
            if (allData[row.category]) {
                allData[row.category].push(row);
            }
        });

        res.json({ success: true, data: allData });

    } catch (error) {
        console.error('Error getAllData:', error);
        res.status(500).json({ success: false, error: 'Gagal mengambil master data.' });
    }
};

const addData = async (req, res) => {
    const category = categoryMap[req.params.table] || req.params.table;
    const { name, description, code, sequence} = req.body;

    if(!allowedCategories.includes(category)) {
        return res.status(400).json({success:false, message: "Category name invalid"});
    }

    try {
        let queryText = `INSERT INTO cms_master_data (category, name, description, code, sequence) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        let queryParams = [category, name, description || null, code || null, sequence];

        const result = await pool.query(queryText, queryParams);
        res.status(201).json({success:true, message:`Data added to ${category}`, data: result.rows[0]});
    } catch(error) {
        console.error(`Error add ${category}`, error);
        res.status(500).json({success:false, message:`Fail adding data to ${category}`});
    }
};

const updateData = async (req, res) => {
    const category = categoryMap[req.params.table] || req.params.table;
    const { id } = req.params;
    const { name, description , code, sequence} = req.body;

    if(!allowedCategories.includes(category)) {
        return res.status(400).json({success: false, message: "Category name invalid"});
    }

    try {
        const queryText = `
        UPDATE cms_master_data
        SET name = $1, description = $2, code = $3, sequence = $4, updated_at = CURRENT_TIMESTAMP
        WHERE id = $5 AND category = $6
        RETURNING *
        `;

        const queryParams = [name, description || null, code || null, sequence || 0, id, category];

        const result = await pool.query(queryText, queryParams);

        if (result.rows.length === 0){
            return res.status(404).json({success:false, message: "Data not found"});
        }

        res.json({success:true, message: "Data updated successfully", data: result.rows[0]});
    } catch (error) {
        console.error(`Error update ${category}`, error);
        res.status(500).json({success: false, message: `Fail updating data in ${category}`});
    }
};

const deleteData = async(req, res) => {
    const category = categoryMap[req.params.table] || req.params.table;
    const { id } = req.params;

    if(!allowedCategories.includes(category)){
        return res.status(400).json({success: false, message: "Category name invalid"});
    }

    try {
        const queryText = `DELETE FROM cms_master_data WHERE id = $1 AND category = $2 RETURNING *`;
        const result = await pool.query(queryText, [id, category]);

        if(result.rows.length === 0){
            return res.status(400).json({success:false, message:"Data not found"});
        }

        res.json({success: true, message: "Data moved to trash"});
    } catch(error){
        console.error(`Error delete ${category}`, error);
        res.status(500).json({success:false, message: `Fail deleting data from ${category}`});
    }
}

module.exports = { getAllData, addData, deleteData, updateData };