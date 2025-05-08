
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? 'https://{repl-name}.{username}.repl.co'
        : '*'
}));

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

// Add root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Task Management API is running',
        endpoints: {
            auth: '/auth',
            projects: '/projects',
            tasks: '/tasks'
        }
    });
});

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access your API at: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Server error:', err.message);
    }
});
