const course = require('../models').course;
const express = require('express');
const router = express.Router();

const getAllCourses = async(req, res) => {
    try {
        const courses = await course.findAll();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCourseById = async(req, res) => {
    try {
        const course = await course.findOne({ where : { id: req.params}});
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
        } else {
            res.json(course);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createCourse = async (req, res) => {
    try{
        console.log(req.user.role)
        if(req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorized to create a course.' });
        }

        const { name, profesor_id } = req.body;
        const newCourse = await course.create({ name, profesor_id });
        return res.status(200).json({ course: newCourse })

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Error creating course' });
    }
}

const deleteCourse = async (req, res) => {
    try{
        if(req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorized to delete a course.' });
        }

        const courseDel = await course.findOne({ where : { id: req.params.id}});

        if(!courseDel) 
            return res.status(404).json({ message: 'Course not found.'});

        await courseDel.destroy();

        res.json({ message: 'Course deleted successfully.' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the course.' });
    }
}

const updateCourse = async (req, res) => {
    try{ 
        if(req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorized for this action!' });
        }

        const courseUpdate = await course.findOne({ where: { id: req.params.id}});

        if(!courseUpdate)
            return res.status(404).json({ message: 'Course not fount.'});
        
        await courseUpdate.update(req.body);  
        
        res.json({ message: 'Course updated successfully' });
    }catch(error){ 
        console.error(error);
        res.status(500).json({ message: 'Error updating the course' });
    }
}

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.delete('/:id', deleteCourse);
router.put('/:id', updateCourse);

module.exports = router;