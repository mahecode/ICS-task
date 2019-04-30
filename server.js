const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const users = require('./routes/users');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//db connection 
mongoose.connect('mongodb://localhost:27017/mernAuth', { useNewUrlParser: true });

const port = process.env.PORT || 5000;

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users',users);

app.listen(port, ()=> {
    console.log(`server is running on port: ${port}`);
});


