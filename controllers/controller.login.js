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
        } else if (userType === 'professor') {
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
        if (!isMatch) {
            return res.status(401).json({ message: 'Username or password is incorrect' });
        }

        //Create JWT token
        const token = await jwt.sign({id: user.id, role: userType}, '88b70c6461025630d4754af0aac3bf99c8128e2e922b2ab42470c7700c013e7b32d8d1fd5dd55f01c3d6dc438c6511d453269dd743b84513074e9425e30eb1c9', { expiresIn: '24h' });

        // Send the token back to the client
        return res.json({ token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error logging in' });
    }
};

module.exports = { login };

// // router.post('/login', (req, res) => {
   
// //         var user;  
// //         var errorCount = 0;
// //         admin.findAll({
// //             where: {
// //                 username: req.body.username,
// //                 account_type: 'admin'
// //             }
// //         })
// //         /*.then((users) => {
// //             user = users[0];
// //             if (user != null) {
// //                 res.redirect('/dashboard');
// //                 console.log(`user: ${user.first_name} ${user.last_name}`);
// //             } else {
// //                 console.log('logging...');
// //             }
// //         })*/
// //         .then((users) => {
// //             // If an admin is found, set the isAdmin property in the session object and redirect to the dashboard
// //             if (users.length > 0) {
// //               req.session.isAdmin = true;
// //               res.redirect('/dashboard');
// //             } else {
// //               // If no admin is found, redirect to the login page
// //               errorCount ++;
// //             }
// //           })
// //         .catch((error) => {
// //             console.error(error);
// //         });

// //         profesor.findAll({
// //             where: {
// //                 username: req.body.username,
// //                 type: 'profesor'
// //             }
// //         })
// //         .then((users) => {
// //             // If an admin is found, set the isAdmin property in the session object and redirect to the dashboard
// //             if (users.length > 0) {
// //               req.session.isProf = true;
// //               res.redirect('/dashboard');
// //             } else {
// //               // If no admin is found, redirect to the login page
// //               errorCount ++;
// //             }
// //           })
// //         .catch((error) => {
// //             console.error(error);
// //         });

// //         student.findAll({
// //           where: {
// //               username: req.body.username,
// //               type: 'student'
// //           }
// //       })
// //       .then((users) => {
// //         // If an admin is found, set the isAdmin property in the session object and redirect to the dashboard
// //         if (users.length > 0) {
// //           req.session.isStud = true;
// //           req.session.studentId = users[0].id
// //           res.redirect('/dashboard');
// //         } else {
// //           // If no admin is found, redirect to the login page
// //           errorCount ++;
// //         }
// //       })
// //       .catch((error) => {
// //           console.error(error);
// //       });

// //       if(errorCount === 3){
// //         console.log('error while logging in');
// //         res.redirect('/login');
// //       }

// //       });

// // module.exports = router;

// // Generate a JWT when a user logs in
// router.post('/', (req, res) => {
//   // Validate the user's login credentials
//   const user = validateCredentials(req.body.username, req.body.password);
//   if (user) {
//     // If the credentials are valid, generate a JWT for the user
//     const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
//       expiresIn: 86400 // expires in 24 hours
//     });
//     res.status(200).send({ auth: true, token: token });
//   } else {
//     res.status(401).send({ auth: false, message: 'Invalid login credentials' });
//   }
// });

// module.exports = router;