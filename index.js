const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const passport = require('passport');
const {connect} = require('mongoose');
const {success,error} = require('consola')


//App constants
const {DB,PORT} = require('./config');

//Initialize the application

const app = express()

//MiddleWare
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require('./middleware/passport')(passport);

//Use Router middleWare
app.use('/api/users',require('./routes/users'));

//Connection with the database

const startApp = async () =>{
    
    try {
        await connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true
        });
        success({
            message: `Successfully connected with the Database \n${DB}`,
            badge:true
        })
        
        app.listen(PORT, () => success({
            message: `Server up and running on PORT ${PORT}`,
            badge: true
        }));

    } catch (err) {
        error({
            message: `Unable to connect with the database\n{err}`,
            badge:true
        })
        startApp()
    }  
}
startApp();
