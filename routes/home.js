const express = require('express');
const { sequelize, DataTypes } = require('sequelize');
const router = express.Router();
const db = require('../config/database');
const admin = require('../models/').admin;

router.get('/', (req, res) => 
    admin.findAll()
    .then(admin => {
        console.log(admin);
        res.sendStatus(200);
    })
    .catch(err => console.log(err))
);

module.exports = router;