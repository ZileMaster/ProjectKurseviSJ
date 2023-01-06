const Sequelize = require('sequelize');
module.exports = new Sequelize('project_kursevi', 'postgres', 'Sifra123', {
    host: 'localhost',
    dialect: 'postgres' 
});
