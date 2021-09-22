const { Router } = require('express');
const express = require('express');
const router = express.Router();

const{
    getAllTasks,
    createNewTask,
    changeTaskInfo,
    deleteTask
} = require('..//controllers/task.controllers');

router.get('/allTasks', getAllTasks);
router.post('/createTask', createNewTask);
router.patch('/updateTask', changeTaskInfo);
router.delete('/deleteTask', deleteTask);

module.exports = router;