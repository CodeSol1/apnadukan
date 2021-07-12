const express = require("express")
const app = express();
const ejs = require('ejs');
const expressLayout = require("express-ejs-layouts");
const path = require('path')


const port = process.env.port || 5000;
// assets
app.use(express.static('public'));

// set templates
app.use(expressLayout);
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')


// Routes
require('./routes/web')(app)










app.listen(port, (req, res) => {
    console.log(`server is running at port no ${port}`)
})
