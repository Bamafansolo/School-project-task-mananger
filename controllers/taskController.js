const db = require('../config/db');

exports.getAllTasks = (req, res) => {
    const query = 'SELECT * FROM tasks WHERE project_id = ?';
    db.all(query, [req.params.projectId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
};

exports.getTask = (req, res) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    db.get(query, [req.params.id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!result) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(result);
        }
    });
};

exports.createTask = (req, res) => {
    const { project_id, title, description, due_date } = req.body;
    const query = 'INSERT INTO tasks (project_id, title, description, due_date) VALUES (?, ?, ?, ?)';
    db.run(query, [project_id, title, description, due_date], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID, title });
        }
    });
};

exports.updateTask = (req, res) => {
    const { title, description, due_date } = req.body;
    const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?';
    db.run(query, [title, description, due_date, req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ message: 'Task updated successfully' });
        }
    });
};

exports.deleteTask = (req, res) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    });
};