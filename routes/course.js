const course = require('../models').course;
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const courses = require('../controllers/controller.course')

router.get('/', courses.show );
router.get('/:id', courses.showOne);
router.post('/', courses.create);
router.delete('/:id', courses.deleteCourse);
router.put('/:id', courses.update);

module.exports = router;