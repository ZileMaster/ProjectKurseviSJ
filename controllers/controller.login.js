const express = require('express');
const router = express.Router();
const admin = require('../models/').admin;
const profesor = require('../models/').profesor;
const student = require('../models/').student;
const session = require('express-session');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const { username, password, userType } = req.body.user;

    try {
        // Find the user in the appropriate table based on userType
        let user;
        if (userType === 'admin') {
            user = await admin.findOne({ where: {username: username }});
        } else if (userType === 'professor' || userType === 'profesor') {
            user = await profesor.findOne({ where: {username: username }});
        } else if (userType === 'student') {
            user = await student.findOne({ where: {username: username }});
        }

        // If no user is found, return an error
        if (!user) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        // Compare the plaintext password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        //Create JWT token
        const token = await jwt.sign({id: user.id, role: userType}, '88b70c6461025630d4754af0aac3bf99c8128e2e922b2ab42470c7700c013e7b32d8d1fd5dd55f01c3d6dc438c6511d453269dd743b84513074e9425e30eb1c9', { expiresIn: '24h' });

        //res.json({ token, redirectUrl: '/dashboard' });
        return res.json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { login };

