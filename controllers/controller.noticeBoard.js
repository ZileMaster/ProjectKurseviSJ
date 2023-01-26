express = require('express');
const noticeBoard = require('../models').notice_board;
const info = require('../models').info;
const profesor = require('../models').profesor;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

const show = async(req, res) => {
   
    try{
        const notices = await info.findAll({ where: { notice_board_id: 1}});
        res.status(200).json({ notices });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error geting the data.'});
    }
}

const showOne = async(req, res) => {
    try{
        const notice = await info.findOne({ where: { id: req.params.id }});
        res.status(200).json({ notice });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error geting the data'});
    }
}

const post = async(req, res) => {
    try{ 
        console.log(req.user.role)
        if(req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

            // Validation: check if text field is empty
        if(!req.body.text){
            return res.status(400).json({ message: 'Text field is required.' });
        }

        // Validation: check if notice_board_id field is empty
        if(!req.body.notice_board_id){
            return res.status(400).json({ message: 'Notice board id field is required.' });
        }
        
        const { text, notice_board_id } = req.body;
        const newNotice = await info.create({ text, notice_board_id});
        return res.status(200).json({ info: newNotice });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Error creating notice. '});
    }
}

const deleteNotice = async(req, res) => {
    try{
        console.log(req.user.role)
        if(req.user.role !== 'professor' || req.user.role !== 'profesor'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        const infoDel = await info.findOne({ where: { id: req.params.id }});
        
        if(!infoDel){
            return res.status(404).json({ message: 'Course not found.'});
        }

        await infoDel.destroy();
        res.json({ message: 'Notice deleted successfully.' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the notice.' });
    }
}

const update = async(req, res) => {
    try{
        console.log(req.user.role)
        if(req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorised for this action.'});
        }

        const infoUpdate = await info.findOne({ where: { id: req.params.id }});

        if(!infoUpdate){
            return res.status(404).json({ message: 'Notice not found.'});
        }

        await infoUpdate.update(req.body);

        res.status(200).json({ message: 'Notice successfuly updated' });
    }catch(error){ 
        console.error(error);
        res.status(500).json({ message: 'Error updating the notice' });
    }
}

module.exports = { show, showOne, post, deleteNotice, update };