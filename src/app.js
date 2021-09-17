const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 80;
const hbs = require('hbs');
const static_path = path.join(__dirname,"../public");
const partial_path = path.join(__dirname,"../templete/partial");
const templetes = path.join(__dirname,"../templete/views")


//to set view engine
app.set("view engine","hbs");
app.set("views",templetes);
hbs.registerPartials(partial_path);
app.use(express.static(static_path));

app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/about",(req,res)=>{
    res.render('about')
})
app.get("/weather",(req,res)=>{
    res.render('weather')
})
app.get("*",(req,res)=>{
    res.render('404error')
})
app.listen(port,()=>{
    console.log(`I am listening on ${port}`)
})