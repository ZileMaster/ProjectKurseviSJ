const express = require('express');
const router = express.Router();
const student = require('../models/').student;
const profesor = require('../models/').profesor;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { first_name, last_name, username, email, password, userType } = req.body;

    try {
        // Check if email is already taken
        let existingUser;
        if (userType === 'student') {
            existingUser = await student.findOne({ username });
        } else if (userType === 'professor') {
            existingUser = await profesor.findOne({ username });
        }

        if (existingUser) {
            return res.status(400).json({ message: 'User is already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the appropriate table
        let newUser;
        if (userType === 'student') {
            newUser = new student({
                first_name,
                last_name,
                username,
                email,
                password: hashedPassword, 
                admin_id: 1, 
                type: "student",
                attendance: 0,
                group_id: 1,

            });
        } else if (userType === 'professor') {
            newUser = new profesor({
                first_name,
                last_name,
                username,
                email,
                password: hashedPassword, 
            });
        }

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};

module.exports = { register };