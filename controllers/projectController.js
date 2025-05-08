
const db = require('../config/db');

exports.getAllProjects = (req, res) => {
    const query = 'SELECT * FROM projects WHERE user_id = ?';
    db.query(query, [req.user.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

exports.getProject = (req, res) => {
    const query = 'SELECT * FROM projects WHERE id = ? AND user_id = ?';
    db.query(query, [req.params.id, req.user.id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json(results[0]);
        }
    });
};

exports.createProject = (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO projects (user_id, name) VALUES (?, ?)';
    db.query(query, [req.user.id, name], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: result.insertId, name });
        }
    });
};

exports.updateProject = (req, res) => {
    const { name } = req.body;
    const query = 'UPDATE projects SET name = ? WHERE id = ? AND user_id = ?';
    db.query(query, [name, req.params.id, req.user.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json({ message: 'Project updated successfully' });
        }
    });
};

exports.deleteProject = (req, res) => {
    const query = 'DELETE FROM projects WHERE id = ? AND user_id = ?';
    db.query(query, [req.params.id, req.user.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json({ message: 'Project deleted successfully' });
        }
    });
};
