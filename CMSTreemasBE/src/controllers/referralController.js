const pool = require('../config/db');

const getAllReferralCodes = async (req, res) => {
    try {
        const query = `SELECT * FROM referral_codes ORDER BY id ASC`;
        const result = await pool.query(query);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error('Error getAllReferralCodes:', error);
        res.status(500).json({ success: false, message: 'Gagal mengambil data referral code' });
    }
};

const addReferralCode = async (req, res) => {
    const { code, description } = req.body;
    try {
        const query = `INSERT INTO referral_codes (code, description) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [code, description]);
        res.status(201).json({ success: true, message: 'Referral code berhasil ditambahkan', data: result.rows[0] });
    } catch (error) {
        if (error.code === '23505') { // Tangkap error duplikat (Unique Constraint)
            return res.status(400).json({ success: false, message: 'Referral code ini sudah ada!' });
        }
        console.error('Error addReferralCode:', error);
        res.status(500).json({ success: false, message: 'Gagal menambah referral code' });
    }
};

const validateReferralCode = async (req, res) => {
    try {

        const code = req.query.code || req.body.code; 

        if (!code) {
            return res.json({ success: true, isValid: false, message: 'Kode tidak boleh kosong' });
        }

        const query = `SELECT * FROM referral_codes WHERE code = $1 AND is_active = TRUE`;
        const result = await pool.query(query, [code]);

        if (result.rows.length > 0) {
            res.json({ success: true, isValid: true, detail: result.rows[0] });
        } else {
    
            res.json({ success: true, isValid: false, message: 'Kode referral tidak valid atau sudah tidak aktif' });
        }
    } catch (error) {
        console.error('Error validateReferralCode:', error);
        res.status(500).json({ success: false, isValid: false, message: 'Terjadi kesalahan server' });
    }
};

module.exports = { getAllReferralCodes, addReferralCode, validateReferralCode };