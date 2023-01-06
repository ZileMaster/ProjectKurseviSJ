const { render } = require('ejs');
const express = require('express');
const { sequelize, DataTypes } = require('sequelize');
const router = express.Router();
const db = require('../config/database');

    router.get('/login', (req, res) => {
        res.render('login');
    })

    const loginRouter = require('../controllers/controller.login')
    router.use('/login', loginRouter);

