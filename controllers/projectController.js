const db = require('../config/db');

exports.getAllProjects = (req, res) => {
    const query = 'SELECT * FROM projects WHERE user_id = ?';
    db.all(query, [req.user.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
};

exports.getProject = (req, res) => {
    const query = 'SELECT * FROM projects WHERE id = ? AND user_id = ?';
    db.all(query, [req.params.id, req.user.id], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (rows.length === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json(rows[0]);
        }
    });
};

exports.createProject = (req, res) => {
    const { name } = req.body;
    const query = 'INSERT INTO projects (user_id, name) VALUES (?, ?)';
    db.run(query, [req.user.id, name], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, name });
        }
    });
};

exports.updateProject = (req, res) => {
    const { name } = req.body;
    const query = 'UPDATE projects SET name = ? WHERE id = ? AND user_id = ?';
    db.run(query, [name, req.params.id, req.user.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json({ message: 'Project updated successfully' });
        }
    });
};

exports.deleteProject = (req, res) => {
    const query = 'DELETE FROM projects WHERE id = ? AND user_id = ?';
    db.run(query, [req.params.id, req.user.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Project not found' });
        } else {
            res.json({ message: 'Project deleted successfully' });
        }
    });
};