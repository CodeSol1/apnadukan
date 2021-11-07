// to eccess .env file
require('dotenv').config()

const express = require("express")
const app = express();
const ejs = require('ejs');
const expressLayout = require("express-ejs-layouts");
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo');
const passport = require('passport')


const port = process.env.PORT || 3000;



// assets
app.use(express.static('public'));

// set templates
app.use(expressLayout);
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

// database connection
const url = "mongodb+srv://Rituraj:wALSbytCgwgyFhua@cluster0.ofmd6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("dataBase Connected...")
}).catch(err => {
    console.log("connection failed...")
})






// session(it is act as middle ware,it is used store cart) config
app.use(session({
    secret: process.env.COOCIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDBStore.create({
        mongoUrl: 'mongodb+srv://Rituraj:wALSbytCgwgyFhua@cluster0.ofmd6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        collection: 'sessions'
    }),

    cookie: { maxAge: 1000 * 60 * 60 * 24 }
    // cookei is set for 24hr
}))

// passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize());
app.use(passport.session());


app.use(flash())

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// globle middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user

    next();
})





// Routes
require('./routes/web')(app)



app.listen(port, (req, res) => {
    console.log(`server is running at port no ${port}`)
})
