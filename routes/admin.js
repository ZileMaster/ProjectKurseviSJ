
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const admin = require('../controllers/controller.admin');
const { authMiddleware } = require('../controllers/controller.auth');

router.post('create/student', authMiddleware, admin.createProfessor);
router.post('create/professor', authMiddleware, admin.createProfessor);
router.put('update/professor/:id', authMiddleware, admin.updateProf);
router.put('update/student/:id', authMiddleware, admin.updateStudent);
router.put('update/admin/:id', authMiddleware, admin.updateAdmin);
router.delete('delete/student/:id', authMiddleware, admin.deleteStudent);
router.delete('delete/professor/:id', authMiddleware, admin.deleteProfesor);

module.exports = router;