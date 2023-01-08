const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); 
const path = require('path');
const { Sequelize } = require('sequelize');
const admin = require('./models/').admin;
const student = require('./models/').student;
const profesor = require('./models/').profesor;
const session = require('express-session');
const cookieParser = require("cookie-parser");
const course = require('./models').course;
const dashboard = require('./controllers/controller.dashboard');

const app = express();
const PORT = process.env.PORT || 3000;

//Database connection
const db = require('./config/database')

//setting the view engine for working with EJS
app.set('view-engine', 'ejs');

//parsiranje informacija koje dolaze
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//serving public file
app.use(express.static(__dirname));

//cookie parser
app.use(cookieParser());

//test
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

//Session middleware
  app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    resave: false 
  }));

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/dashboard', dashboard);

// app.get('/dashboard', (req, res) => {
//   if (req.session.isAdmin) {
//     var userStud
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
//   }else if(req.session.isProf){
//     var userStud;
//     student.findAll()
//       .then((students) => {
//         userStud = students;
//         res.render('dashboard.ejs', { students: userStud , professors: null, student:null});
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }else if(req.session.isStud){
//     student.findOne({
//       where: {
//         id: req.session.studentId
//       }
//     }).then((student) => {
//       res.render('dashboard.ejs', { professors: null, students: null, student: student});
//     }).catch((error) => {
//       console.error(error);
//     });
//     }else {
//     res.redirect('/login');
//   }
// });

app.get('/courses', (req, res) => {
  var courses
  course.findAll()
    .then((courses) => {
      res.render('courses.ejs',{courses: courses});
    })
      .catch((error) => {
        console.error(error);
      })
})

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
    } else {
      res.redirect('/');
    }
  });
});

app.get('/signup', (req, res) => {
    res.render('register.ejs')
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})

app.post('/register', (req, res) => {
    user.create({
        first_name: req.body.name, 
        last_name: req.body.lastName, 
        username: req.body.username, 
        password: req.body.password, 
        email: req.body.email, 
        admin_id: 1, 
        type:"student", 
        group_id: 1, 
        attendance: 0, 
    })
    res.redirect('/login');
})

const loginController = require('./controllers/controller.login');
app.use('/', loginController);

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/dashboard', (req, res) => {
  console.log(req);
  res.render('dashboard', { user: req.session.user });
});

app.use('/home', require('./routes/home'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));