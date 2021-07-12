const express = require("express")
const app = express();
const ejs = require('ejs');
const expressLayout = require("express-ejs-layouts");
const path = require('path')


const port = process.env.port || 5000;
// assets
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render("home")
})

// set templates
app.use(expressLayout);
app.set('views',path.join(__dirname,'/templates/views'))
app.set('view engine', 'ejs')



app.listen(port, (req, res) => {
    console.log(`server is running at port no ${port}`)
})
