 
const session = require('express-session')
const express =  require('express')
const app     =  express()

const  db = require('./models/db')
const bodyParser = require('body-parser')
const auth      = require('./routes/auth')
const port      = process.env.PORT || 3000
const login    = require('./middleware/auth')
//View EJS
app.set('view engine', 'ejs');
app.set('views', './views');

//Body Parser
app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  }));

   
  //user router
  app.use('/auth', auth)
  app.use('/',  require('./routes/sinhvien'))

  app.get('/',(req, res)=>{
    res.redirect('auth/login')
  })
  db.sync().then(function() {
    app.listen(port);
    console.log(`Server is listening on port ${port}`);
  }).catch(function(err) {
    console.log(err);
    process.exit(1);
  });
  