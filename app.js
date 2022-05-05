const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { HTTPErrorCodes, HTTPError } = require('./src/common/http-error');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/error-handler');
require('./src/services/setup');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.sendOk = () => {
        res.send({});
    };
    res.sendFormatted = (data = {}, { meta, errorCode, message } = {}) => {
        res.send({
            data, meta, code: errorCode, message,
        });
    };
    next();
});

// Add routing
routes(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new HTTPError(
        HTTPErrorCodes.NOT_FOUND,
        'Not Found',
    ));
});

// error handler
app.use(errorHandler);

module.exports = app;
