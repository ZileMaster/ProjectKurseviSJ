const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); 
const path = require('path');
const { Sequelize } = require('sequelize');
const admin = require('./models/').admin;
const student = require('./models/').student;
const profesor = require('./models/').profesor;
const cookieParser = require("cookie-parser");
const course = require('./models').course;
const dashboard = require('./controllers/controller.dashboard');
const jwt = require('jsonwebtoken');

const secretKey = "88b70c6461025630d4754af0aac3bf99c8128e2e922b2ab42470c7700c013e7b32d8d1fd5dd55f01c3d6dc438c6511d453269dd743b84513074e9425e30eb1c9";

const app = express();
const PORT = process.env.PORT || 3000;

//Database connection
const db = require('./config/database');

//setting the view engine for working with EJS
app.set('view engine', 'ejs');

//parsing the incoming information
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//serving public file
app.use(express.static(__dirname));

//cookie parser
app.use(cookieParser());

//test
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Define a middleware function to verify the JWT
function verifyToken(req, res, next) {
  // Get the JWT from the request header
  const token = req.headers['x-access-token'];
  if (!token) {
    // If the JWT is missing, return an error
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  // Verify the JWT and decode the user's information
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // If the JWT is invalid, return an error
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // Set the user's information in the request object
    req.user = decoded;
    // Call the next middleware function
    next();
  });
}

app.get('/', (req, res) => {
    res.render('index.ejs');
});

const { register } = require('./controllers/controller.register');

const { login } = require('./controllers/controller.login');

app.post('/register', register);
// app.post('/login', (req, res) => {
//   // Find the user in the database
//   admin.findOne({
//     where: {
//       username: req.body.username,
//       account_type: 'admin'
//     }
//   }).then((admin) => {
//     // If an admin is found, create a JWT for the user and send it in the response
//     if (admin) {
//       const token = jwt.sign({ id: admin.id, isAdmin: true }, secretKey, { expiresIn: 86400 }); // expires in 24 hours
//       // set the JWT as a cookie
//       res.json({ token: token });
//       // redirect the client to the /dashboard page
//       //res.render('index', { admin: admin });
//       console.log(admin.first_name, admin.last_name);
//     } else {
//       // If no user is found, try searching for a professor
//       profesor.findOne({
//         where: {
//           username: req.body.username,
//           type: 'profesor'
//         }
//       }).then((profesor) => {
//         // If a professor is found, create a JWT for the user and send it in the response
//         if (profesor) {
//           const token = jwt.sign({ id: profesor.id, isProf: true }, secretKey, { expiresIn: 86400 }); // expires in 24 hours
//           // set the JWT as a cookie
//           res.json({ token: token });
//           // redirect the client to the /dashboard page
//           //res.render('index', { profesor });
//           console.log(profesor.first_name, profesor.last_name);
//         } else {
//           // If no user is found, try searching for a student
//           student.findOne({
//             where: {
//               username: req.body.username,
//               type: 'student'
//             }
//           }).then((student) => {
//             // If a student is found, create a JWT for the user and send it in the response
//             if (student) {
//               const token = jwt.sign({ id: student.id, isStud: true }, secretKey, { expiresIn: 86400 }); // expires in 24 hours
//               // set the JWT as a cookie
//               res.json({ token: token });
//               // redirect the client to the /dashboard page
//               //res.render('index', { student });
//               console.log(student.first_name, student.last_name);
//             } else {
//               // If no user is found, return an error
//               return res.status(404).send({ auth: false, message: 'Username or password is incorrect.' });
//             }
//           });
//         }
//       });
//     }
//   });
// });

app.post('/login', login);

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/dashboard', verifyToken, (req, res) => {
  if (req.user.isAdmin) {
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
  } else if(req.user.isProf) {
    var userStud;
    student.findAll()
      .then((students) => {
        userStud = students;
        res.render('dashboard.ejs', { students: userStud , professors: null, student:null});
      })
      .catch((error) => {
        console.error(error);
      });
  } else if(req.user.isStud) {
    student.findOne({
      where: {
        id: req.user.id
      }
    }).then((student) => {
      res.render('dashboard.ejs', { professors: null, students: null, student: student});
    }).catch((error) => {
      console.error(error);
    });
    } else {
    res.redirect('/login');
  }
});

app.get('/courses', (req, res) => {
  var courses
  course.findAll()
    .then((courses) => {
      res.render('courses.ejs',{courses: courses});
    })
      .catch((error) => {
        console.error(error);
      })
});

/*app.get('/logout', (req, res) => {
  // Clear the user's JWT from the request header
  req.headers['x-access-token'] = null;
  res.redirect('/');
});

app.get('/signup', (req, res) => {
    res.render('register.ejs');
});

app.get('/contact', (req, res) => {
    res.render('contact.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});*/

app.listen(PORT, console.log(`Server started on port ${PORT}`));