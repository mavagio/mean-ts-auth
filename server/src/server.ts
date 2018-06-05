import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from "passport";
import * as session from 'express-session';
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";

require('./config/passport')(passport);

const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const db: string = String((process.env.NODE_ENV === 'production') ? process.env.PROD_DB : process.env.DEV_DB);

mongoose.connect(db, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
});

/**
 * Set up our express application
 * */
app.use(express.static('public'));
app.use(express.static('files'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', 1);
//
//     // Pass to next layer of middleware
//     next();
// });

/**
 * Set up for passport authentication
 * */
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false
    },

}));

// session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/**
 * Set up routes
 * */
const routes = require('./api/routes/apiRoutes');
routes(app, passport);

app.listen(port);
console.log('RESTful API server started on: ' + port);
