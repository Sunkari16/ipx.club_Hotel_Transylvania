const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const LOGGER = require('./src/common/logger');
const { HTTPErrorCodes, HTTPError } = require('./src/common/http-error');
const { isDevelopment } = require('./config');
const routes = require('./src/routes');

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
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    LOGGER.error(err.stack);
    const statusCode = (err.status || err.statusCode
        || res.statusCode || HTTPErrorCodes.INTERNAL_SERVER_ERROR);
    const trace = isDevelopment && err.stack ? err.stack : undefined;
    let message;
    if (statusCode === HTTPErrorCodes.INTERNAL_SERVER_ERROR) {
        if (isDevelopment) {
            message = err.message;
        } else {
            message = 'Something went wrong';
        }
    } else {
        message = err.message;
    }

    return res.status(statusCode).json({
        error: true,
        message,
        trace,
        code: statusCode.toString(),
        meta: err.meta,
    });
});

module.exports = app;
