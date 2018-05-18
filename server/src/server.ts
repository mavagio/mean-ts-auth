import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const db: string = String((process.env.NODE_ENV === 'production') ? process.env.PROD_DB : process.env.DEV_DB);

mongoose.connect(db, {
    useMongoClient: true,
    promiseLibrary: global.Promise,
});

app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static('public'));
app.use(express.static('files'));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));

const routes = require('./api/routes/apiRoutes');
routes(app);

app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

app.get('/', (req, res) => {
    res.sendFile('public/index.html');
});

app.listen(port);

console.log('RESTful API server started on: ' + port);
