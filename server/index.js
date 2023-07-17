const express=require('express');
const nodemailer = require('nodemailer');
const cookieSession=require('cookie-session');
const cors = require("cors");
const passport = require("passport");
const passportSetup=require('./passport');
const authRoute = require("./routes/auth");
const propRoute=require('./routes/property');
const adminRoute=require('./routes/admin');
const connect=require("./database/db");
const bodyParser = require('body-parser');

const app=express();

app.use(cookieSession({
    name:"session",
    keys:["kuwa"],
    maxAge: 24*60*60*100
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

app.use(bodyParser.json());
app.use("/auth", authRoute);
app.use("/prop",propRoute);
app.use('/admin',adminRoute);

connect;
app.listen("5000",()=>{
    console.log(`server is running at http://localhost:5000`)
})