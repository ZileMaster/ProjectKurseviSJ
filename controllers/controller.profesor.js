const express = require('express');
const student = require('../models/').student;
const profesor = require('../models/').profesor;
const admin = require('../models/').admin;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('sequelize');

const createStudentProf = async( req, res) => {
    try{ 
        if(req.user.role !== 'professor' || req.user.role !== 'profesor'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        if(req.params.id != req.user.id){
            return res.status(402).json({ message: "User session timed out "});
        }

        const { first_name, last_name, username, firstPassword, email, group_id } = req.body;
        
        const password = await bcrypt.hash(firstPassword, 10);
        const newStud = await student.create
            ({ 
                first_name, 
                last_name,
                username, 
                password, 
                email, 
                group_id, 
                admin_id: 1, 
                type: "student",
                attendance: 0,
            })

            await newStud.save();
            if(newStud)
                return res.status(201).json({ message: 'User created successfully' });
            else
                return res.status(500).json({ message: 'Error creating user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
}

const updateStudentProf = async(req, res) => {
    try{ 
        if(req.user.role !== 'professor' || req.user.role !== 'profesor'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        const { first_name, last_name, username, firstPassword, email, group_id, attendance } = req.body;
        
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

const deleteStudentProf = async(req, res) => {
    try{ 
        if(req.user.role !== 'profesor' || req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
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

const updateProfProf = async(req, res) => {
    try{ 
        if(req.user.role !== 'profesor' || req.user.role !== 'professor'){
            return res.status(401).json({ message: 'You are not authorized for this action.'});
        }

        const { first_name, last_name, username, firstPassword, email } = req.body;
        
        const prof = await profesor.findOne({ where: { id: req.params.id }});
        
        if(!prof){
            return res.status(404).json({ message: 'Non-existant professor selected.'});
        }
        if(firstPassword){
            const password = await bcrypt.hash(firstPassword, 10);
        

        await profesor.update
            ({ 
                name, 
                last_name,
                username, 
                password, 
                email, 
                admin_id: 1, 
                type: "profesor",
            }, 
            { where: {
                id: prof.id
            }});
        }else{
                await profesor.update
                ({ 
                    first_name, 
                    last_name,
                    username, 
                    email, 
                    admin_id: 1, 
                    type: "profesor"
                }, 
                { where: {
                    id: prof.id
                }});
            }

            if(prof)
                return res.status(201).json({ message: 'User created successfully' });
            else
                return res.status(500).json({ message: 'Error creating user' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
}

module.exports = { createStudentProf, updateStudentProf, deleteStudentProf, updateProfProf};