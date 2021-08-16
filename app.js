const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
// load config
dotenv.config({path: './config/config.env'})

console.log("mongo uri: ",process.env.MONGO_URI)

//passport config
require('./config/passport')(passport)

connectDB();

const app = express()

if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    
  }))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//static folder
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))


const PORT = process.env.PORT || 3000


app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));