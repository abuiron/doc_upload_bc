const express = require('express');
const multer = require('multer');
const db = require('../db'); // Import database connection
const path = require('path');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage });

// Route to fetch all documents for an applicant
router.get('/:applicantId', (req, res) => {
    const { applicantId } = req.params;
    db.query('SELECT * FROM documents WHERE applicant_id = ?', [applicantId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route to upload a document
router.post('/', upload.single('file'), (req, res) => {
    const { applicant_id, file_name } = req.body;
    if (!req.file) return res.status(400).json({ error: 'File is required' });

    const file_path = `/uploads/${req.file.filename}`;
    db.query(
        'INSERT INTO documents (applicant_id, file_name, file_path) VALUES (?, ?, ?)',
        [applicant_id, file_name, file_path],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: result.insertId, file_name, file_path });
        }
    );
});

// Route to delete a document
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM documents WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Document deleted' });
    });
});

module.exports = router; // ✅ Export router
