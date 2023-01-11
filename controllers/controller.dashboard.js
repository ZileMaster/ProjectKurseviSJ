const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const admin = require('../models/').admin;
const student = require('../models/').student;
const profesor = require('../models/').profesor;
const session = require('express-session');

/*function dashboard(req, res) {
    if (req.session.isAdmin) {
      var userStud
      student.findAll()
        .then((students) => {
          userStud = students;
        })
        .catch((error) => {
          console.error(error);
        });
        profesor.findAll()
          .then((professors) => {
            res.render('dashboard.ejs', { professors: professors, students: userStud, student: null});
          })
          .catch((error) => {
          console.error(error)
        });
    }else if(req.session.isProf){
      var userStud;
      student.findAll()
        .then((students) => {
          userStud = students;
          res.render('dashboard.ejs', { students: userStud , professors: null, student:null});
        })
        .catch((error) => {
          console.error(error);
        });
    }else if(req.session.isStud){
      student.findOne({
        where: {
          id: req.session.studentId
        }
      }).then((student) => {
        res.render('dashboard.ejs', { professors: null, students: null, student: student});
      }).catch((error) => {
        console.error(error);
      });
      }else {
      res.redirect('/login');
    }
  }
  
  module.exports = dashboard;*/

//   const express = require('express');
// const router = express.Router();
// const { Sequelize } = require('sequelize');
// const student = require('../models/').student;
// const profesor = require('../models/').profesor;
// const course = require('../models').course;

// // Verify the JWT in the request header
// const verifyToken = require('../verifyToken');

// router.get('/', verifyToken, (req, res) => {
//   // The request will proceed if the JWT is valid
//   // The decoded user's information is available in the request object
//   if (req.user.isAdmin) {
//     var userStud;
//     student.findAll()
//       .then((students) => {
//         userStud = students;
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//       profesor.findAll()
//         .then((professors) => {
//           res.render('dashboard.ejs', { professors: professors, students: userStud, student: null});
//         })
//         .catch((error) => {
//         console.error(error)
//       });
//   } else if (req.user.isProf) {
//     var userStud;
//     student.findAll()
//       .then((students) => {
//         userStud = students;
//         res.render('dashboard.ejs', { students: userStud , professors: null, student:null});
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   } else if (req.user.isStud) {
//     student.findOne({
//       where: {
//         id: req.user.studentId
//       }
//     }).then((student) => {
//       res.render('dashboard.ejs', { professors: null, students: null, student: student});
//     }).catch((error) => {
//       console.error(error);
//     });
//   } else {
//     res.redirect('/login');
//   }
// });

// module.exports = router;