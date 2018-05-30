import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as passport from "passport";
import * as session from 'express-session';
import * as cookieParser from "cookie-parser";
var morgan = require('morgan')


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

app.set('view engine', 'ejs'); // set up ejs for templating


/**
 * Set up for passport authentication
 * */
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/**
 * Set up routes
 * */
const routes = require('./api/routes/apiRoutes');
routes(app, passport);

app.listen(port);

console.log('RESTful API server started on: ' + port);
