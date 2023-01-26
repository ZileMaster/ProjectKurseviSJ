const course = require('../models').course;
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const comments = require('../controllers/controller.course_comment');

router.get('/', comments.show );
router.get('/:id', comments.showOne);
router.post('/', comments.create);
router.delete('/:id', comments.deleteComment);
router.put('/:id', comments.update);

module.exports = router;