const express = require('express');
const router = express.Router();
const admin = require('../models/').admin;
const profesor = require('../models/').profesor;
const student = require('../models/').student;
const session = require('express-session');

router.post('/login', (req, res) => {
        
        var user;  
        var errorCount = 0;
        admin.findAll({
            where: {
                username: req.body.username,
                account_type: 'admin'
            }
        })
        /*.then((users) => {
            user = users[0];
            if (user != null) {
                res.redirect('/dashboard');
                console.log(`user: ${user.first_name} ${user.last_name}`);
            } else {
                console.log('logging...');
            }
        })*/
        .then((users) => {
            // If an admin is found, set the isAdmin property in the session object and redirect to the dashboard
            if (users.length > 0) {
              req.session.isAdmin = true;
              res.redirect('/dashboard');
            } else {
              // If no admin is found, redirect to the login page
              errorCount ++;
            }
          })
        .catch((error) => {
            console.error(error);
        });

        profesor.findAll({
            where: {
                username: req.body.username,
                type: 'profesor'
            }
        })
        .then((users) => {
            // If an admin is found, set the isAdmin property in the session object and redirect to the dashboard
            if (users.length > 0) {
              req.session.isProf = true;
              res.redirect('/dashboard');
            } else {
              // If no admin is found, redirect to the login page
              errorCount ++;
            }
          })
        .catch((error) => {
            console.error(error);
        });

        student.findAll({
          where: {
              username: req.body.username,
              type: 'student'
          }
      })
      .then((users) => {
        // If an admin is found, set the isAdmin property in the session object and redirect to the dashboard
        if (users.length > 0) {
          req.session.isStud = true;
          req.session.studentId = users[0].id
          res.redirect('/dashboard');
        } else {
          // If no admin is found, redirect to the login page
          errorCount ++;
        }
      })
      .catch((error) => {
          console.error(error);
      });

      if(errorCount === 3){
        console.log('error while logging in');
        res.redirect('/login');
      }

      });

module.exports = router;