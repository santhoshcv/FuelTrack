const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

// Get all transactions (admin only)
router.get('/', authenticateToken, authorizeAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transactions ORDER BY timestamp DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Get transactions by date range
router.get('/date-range', authenticateToken, async (req, res) => {
    const { start_date, end_date } = req.query;
    try {
        const result = await pool.query(
            'SELECT * FROM transactions WHERE timestamp BETWEEN $1 AND $2 ORDER BY timestamp DESC',
            [start_date, end_date]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Get transactions by device ID
router.get('/device/:deviceId', authenticateToken, async (req, res) => {
    const { deviceId } = req.params;
    const { start_date, end_date } = req.query;
    
    try {
        const result = await pool.query(
            'SELECT * FROM transactions WHERE device_id = $1 AND timestamp BETWEEN $2 AND $3 ORDER BY timestamp DESC',
            [deviceId, start_date, end_date]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Create new transaction
router.post('/', authenticateToken, async (req, res) => {
    const { device_id, rfid, volume } = req.body;
    
    try {
        const result = await pool.query(
            'INSERT INTO transactions (device_id, rfid, volume) VALUES ($1, $2, $3) RETURNING *',
            [device_id, rfid, volume]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

module.exports = router;