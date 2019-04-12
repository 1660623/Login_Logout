const  Sequelize = require('sequelize')
const   db = require('./db')
const   SinhVien  = db.define('sinhvien',{

   name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
   email:{
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
   }, 
   password:{
    type: Sequelize.STRING,
    allowNull: false,
   }

})


module.exports =  SinhVien