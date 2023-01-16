const course = require('../models').course;
const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const lecture = require('../models').lecture;

const getAllLectures = async(req, res) => {
    try {
        const lect = await lecture.findAll();
        res.json(lect);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLectById = async(req, res) => {
    try {
        const lect = await lecture.findOne({ where : { id: req.params}});
        if (!lect) {
            res.status(404).json({ message: 'Lecture not found' });
        } else {
            res.json(lect);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createLect = async (req, res) => {
    try{
        console.log(req.user.role)
        if(req.user.role !== 'professor' || req.user.role !== 'profesor'){
            return res.status(401).json({ message: 'You are not authorized to create a lecture.' });
        }

        const { lecture_data_id, profesor_id, group_id } = req.body;

        if(!profesor_id){
            return res.status(400).json({ message: 'Please provide a professor.' });
        }

        const existingLecture = await lecture.findOne({ where: { name } });
        if(existingLecture){
        return res.status(400).json({ message: 'This lecture already exists.' });
    }

        const newLect = await course.create({ lecture_data_id, profesor_id, group_id });
        return res.status(200).json({ course: newLect })

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Error creating lecture' });
    }
}

const deleteLect = async (req, res) => {
    try{
        if(req.user.role === 'professor' || req.user.role === 'profesor'){
            return res.status(401).json({ message: 'You are not authorized to delete a course.' });
        }

        const lectDel = await lecture.findOne({ where : { id: req.params.id}});

        if(!lectDel){
            return res.status(404).json({ message: 'Lecture not found.'});
        }
        await lectDel.destroy();

        res.json({ message: 'lecture deleted successfully.' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the lecture.' });
    }
}

const updateLecture = async (req, res) => {
    try{ 
        if(req.user.role === 'profesor'){
            return res.status(401).json({ message: 'You are not authorized for this action!' });
        }

        const lectUpdate = await course.findOne({ where: { id: req.params.id}});

        if(!lectUpdate)
            return res.status(404).json({ message: 'Lecture not fount.'});
        
        await lectUpdate.update(req.body);  
        
        res.json({ message: 'Lecture updated successfully' });
    }catch(error){ 
        console.error(error);
        res.status(500).json({ message: 'Error updating the lecture' });
    }
}

router.get('/', getAllLectures);
router.get('/:id', getLectById);
router.post('/', createLect);
router.delete('/:id', deleteLect);
router.put('/:id', updateLecture);

module.exports = router;