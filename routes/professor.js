
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const professor = require('../controllers/controller.profesor');
const { authMiddleware } = require('../controllers/controller.auth');

router.post('create/student', authMiddleware, professor.createStudentProf);
router.put('update/professor/:id', authMiddleware, professor.updateProfProf);
router.put('update/student/:id', authMiddleware, professor.updateStudentProf);

module.exports = router;