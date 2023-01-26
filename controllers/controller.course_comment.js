const express = require('express');
const student = require('../models/').student;
const profesor = require('../models/').profesor;
const course = require('../models/').course;
const admin = require('../models/').admin;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');
const comment = require('../models/').course_comment;

const show = async(req, res) => {
   
    try{
        const comm = await info.findAll({ where: { student_id: req.body.student_id }});
        res.status(200).json({ comm });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error geting the data.'});
    }
}

const showOne = async(req, res) => {
    try{
        const comm = await comment.findOne({ where: { id: req.params.id }});
        res.status(200).json({ comm });
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error geting the data.'});
    }
}

const create = async(req, res) => {
    try{ 
        console.log(req.user.role)
        if(req.user.role !== 'student'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

            // Validation: check if text field is empty
        if(!req.body.text){
            return res.status(400).json({ message: 'Text field is required.' });
        }

        const { text, student_id } = req.body;
        const newComment = await info.create({ text, student_id});
        return res.status(200).json({ comment: newComment });
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Error creating comment. '});
    }
}

const deleteComment = async(req, res) => {
    try{
        console.log(req.user.role)
        if(req.user.role !== 'student'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        const commDel = await comment.findOne({ where: { id: req.params.id }});
        
        if(!commDel){
            return res.status(404).json({ message: 'Comment not found.'});
        }

        await commDel.destroy();
        res.json({ message: 'Comment deleted successfully.' });
    } catch(error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the comment.' });
    }
}

const update = async(req, res) => {
    try{
        console.log(req.user.role)
        if(req.user.role !== 'student'){
            return res.status(401).json({ message: 'You are not authorised for this action.'});
        }

        const commUpdate = await comment.findOne({ where: { id: req.params.id }});

        if(!commUpdate){
            return res.status(404).json({ message: 'Comment not found.'});
        }

        await commUpdate.update(req.body);

        res.status(200).json({ message: 'Comment successfuly updated' });
    }catch(error){ 
        console.error(error);
        res.status(500).json({ message: 'Error updating the comment' });
    }
}

module.exports = { show, showOne, create, deleteComment, update };