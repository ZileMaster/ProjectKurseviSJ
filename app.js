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
const { dashboard } = require('./controllers/controller.dashboard');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./controllers/controller.auth');
const bcrypt = require("bcrypt");


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

// // //podsetnik za mene password je SecretPass1389! za admina! I profesorForTest1234 za profesora!!
// // //kad sam pravio prve migracije nisam sa bcrypt lozinke nego kao obican string
// async function encryptProfPassword() {
//   // Find the admin account in the database
//   const profAccount = await admin.findOne({ where: { username: "az_zile01"} });
//   const password = "SecretPass1389!";
//   // Hash the admin's plain text password
//   const hashedPassword = await bcrypt.hash(password, 10);
//   // Update the admin account's password in the database
//   await admin.update({ password: hashedPassword }, { where: { id: profAccount.id } });
// }

//encryptProfPassword();

//test
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

const { register } = require('./controllers/controller.register');
const { login } = require('./controllers/controller.login');

app.post('/register', register);
app.post('/login', login);

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

console.log(authMiddleware, dashboard);

app.get('/dashboard', authMiddleware, dashboard);

const coursesRoutes = require('./routes/course');
app.use('/courses', authMiddleware, coursesRoutes);

//isto, premesti fajl u routes/, promeni mu ime, preomesti require ovde
const lectureRoutes = require('./routes/lectures');
app.use('/lectures', authMiddleware, lectureRoutes);


const commentsRoutes = require('./routes/comments');
app.use('/course/:id/comments', authMiddleware, commentsRoutes); 

//functionalities of the notice board
//pomrei require ovde
//rename metoda tako da ih ocistis
//i promeni require tako da raspakujes celu klasu
//i rute izdvoj u route modul jer onda i mas prefix
//i umesto kontrolera ovde ucitas routes, a u routes ubacis require kontrolera
//ubacis prefix ovde, a u rutarama ti onda ne treba

const noticeBoardRoutes = require('./routes/notice');
app.use("/notice_board", noticeBoardRoutes); 

//functionalities of the admin controller
const adminRoutes = require('./routes/admin');
app.use("/admin/dashboard/", adminRoutes);

const professorRoutes = require('./routes/professor');
app.use("/professor/dashboard", professorRoutes);

//functionalities of the student controller 
const studentRoutes = require('./routes/student');
app.use("/student/dashboard", studentRoutes);

//getting the views in place: 
app.post('/login', login);
app.post('/register', register);

app.get('/dashboard', authMiddleware, dashboard);

app.listen(PORT, console.log(`Server started on port ${PORT}`));