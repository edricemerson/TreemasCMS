const pool = require('../config/db');

const submitProfile = async (req, res) => {
    // Menangkap data dari formData di React
    const {
        namaUmkm, produkUtama, lokasi, namaKontak, jabatan, 
        email, nomorTelepon, teamSize, howFarAlong, tipeBisnis, annualRevenue,referralCode
    } = req.body;

    // Validasi sederhana (opsional, pastikan email tidak kosong)
    if (!email || !namaUmkm) {
        return res.status(400).json({ success: false, message: "Email dan Nama Bisnis wajib diisi!" });

    }

    try {
        const emailCheckQuery = `SELECT id FROM business_profiles WHERE email = $1`;
        const emailCheckResult = await pool.query(emailCheckQuery, [email]);

        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Email ini sudah terdaftar. Silakan gunakan email lain." 
            });
        }
        const queryText = `
            INSERT INTO business_profiles (
                nama_umkm, produk_utama, provinsi, nama_kontak, jabatan, 
                email, nomor_telepon, company_size_id, how_far_along, business_type, annual_revenue, referral_code
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
            ) RETURNING *;
        `;
        const queryParams = [
            namaUmkm, produkUtama, lokasi, namaKontak, jabatan,
            email, nomorTelepon, teamSize, howFarAlong, tipeBisnis, annualRevenue, referralCode
        ];

        const result = await pool.query(queryText, queryParams);
        
        res.status(201).json({ 
            success: true, 
            message: "Profil bisnis berhasil disimpan!", 
            data: result.rows[0] 
        });

    } catch (error) {
        console.error("Gagal menyimpan profil bisnis:", error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan pada server." });
    }
};

module.exports = { submitProfile };