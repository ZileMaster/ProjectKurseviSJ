const express = require('express');
const student = require('../models/').student;
const profesor = require('../models/').profesor;
const admin = require('../models/').admin;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

const updateStudentStud = async(req, res) => {
    try{ 
        if(req.user.role !== 'student'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        const { first_name, last_name, username, firstPassword, email, group_id, attendance } = req.body;

        const idPage = req.params.id; 
        if(idPage !== req.user.id){
            return res.status(402).json({ message: "User session timed out "});
        }

        const stud = await student.findOne({ where: { id: req.params.id }});

        if(!stud){
            return res.status(404).json({ message: 'Non-existant student selected.'});
        }

        if(firstPassword){
            const password = await bcrypt.hash(firstPassword, 10);
        
        await student.update
            ({ 
                first_name, 
                last_name,
                username, 
                password, 
                email, 
                group_id, 
                admin_id: 1, 
                type: "student",
                attendance: 0
            }, 
            { where: {
                id: stud.id
            }});
        }else{
            await student.update
            ({ 
                first_name, 
                last_name,
                username, 
                email, 
                group_id, 
                admin_id: 1, 
                type: "student",
                attendance: 0
            }, 
            { where: {
                id: stud.id
            }});
        }
        
            if(stud)
                return res.status(201).json({ message: 'User updated successfully' });
            else
                return res.status(500).json({ message: 'Error updating user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating user' });
    }
}

const deleteStudentStud = async(req, res) => {
    try{ 
        if(req.user.role !== 'student'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        const idPage = req.params.id; 
        if(idPage !== req.user.id){
            return res.status(402).json({ message: "User session timed out "});
        }

        const stud = await student.findOne({ where: { id: req.params.id }});
        if(!stud){
            return res.status(404).json({ message: 'Non existant student selected.'});
        }

        await stud.destroy();

        res.json({ message: 'Student has been deleted.'});
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error deleting the course.'});
    }
}

module.exports = { updateStudentStud, deleteStudentStud };