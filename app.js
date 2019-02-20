const express = require('express');
const http = require('http'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    passport = require('passport'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
/* custom setting with passport common for whole project */
require('./config/passport');

let isProduction = process.env.NODE_ENV === 'production';
// initialize our express app
const app = express();

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

if (!isProduction) {
    app.use(errorhandler());
}
const config = require('./config/config');


if (isProduction) {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
} else {
    // mongoose.connect('mongodb://54.173.35.192/asteriskcdrdb',{ useNewUrlParser: true});
    mongoose.connect(config.url, { useNewUrlParser: true });
}

mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);
const routes = require('./routes');

app.use(routes);






let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
