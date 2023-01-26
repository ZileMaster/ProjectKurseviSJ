
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const student = require('../controllers/controller.student');
const { authMiddleware } = require('../controllers/controller.auth');

router.put('update/student/:id', authMiddleware, student.updateStudentStud);
router.delete('delete/student/:id', authMiddleware, student.deleteStudentStud);

module.exports = router;