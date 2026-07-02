const pool = require('../config/db');

const submitProfile = async (req, res) => {
    // Menangkap data dari formData di React
    const {
        namaUmkm, produkUtama, lokasi, namaKontak, jabatan, 
        email, nomorTelepon, teamSize, howFarAlong, tipeBisnis, annualRevenue
    } = req.body;

    // Validasi sederhana (opsional, pastikan email tidak kosong)
    if (!email || !namaUmkm) {
        return res.status(400).json({ success: false, message: "Email dan Nama Bisnis wajib diisi!" });
    }

    try {
        const queryText = `
            INSERT INTO business_profiles (
                nama_umkm, produk_utama, provinsi, nama_kontak, jabatan, 
                email, nomor_telepon, company_size_id, how_far_along, business_type, annual_revenue
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
            ) RETURNING *;
        `;

        // Pastikan urutannya sama persis dengan $1 sampai $11 di atas
        const queryParams = [
            namaUmkm, produkUtama, lokasi, namaKontak, jabatan,
            email, nomorTelepon, teamSize, howFarAlong, tipeBisnis, annualRevenue
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