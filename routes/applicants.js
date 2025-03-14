const express = require('express');
const db = require('../db'); // Import database connection

const router = express.Router();

// Route to fetch all applicants
router.get('/', (req, res) => {
    db.query('SELECT * FROM applicants', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route to add an applicant
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    db.query('INSERT INTO applicants (name) VALUES (?)', [name], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: result.insertId, name });
    });
});

// Route to delete an applicant
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM applicants WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Applicant deleted' });
    });
});

module.exports = router; // ✅ Export router
