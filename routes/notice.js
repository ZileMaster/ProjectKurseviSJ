const course = require('../models').course;
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const noticeBoard = require('../controllers/controller.noticeBoard');
const { authMiddleware } = require('../controllers/controller.auth');

router.get('/', noticeBoard.show);
router.get('/info/:id', noticeBoard.showOne);
router.post('/info', authMiddleware, noticeBoard.post);
router.delete('/info/:id', authMiddleware, noticeBoard.deleteNotice);
router.put('/info/:id', authMiddleware, noticeBoard.update);

module.exports = router;