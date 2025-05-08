
const express = require('express');
const { getAllTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

router.get('/', getAllTasks);
router.get('/:id', getTask);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
