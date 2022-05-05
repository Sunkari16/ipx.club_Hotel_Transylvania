// eslint-disable no-param-reassign
const Mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoError } = require('mongodb-core');
// eslint-disable-next-line import/no-extraneous-dependencies
const MongodbMongoError = require('mongodb').MongoError;

const { HTTPErrorCodes } = require('../common/http-error');
const { isDevelopment } = require('../../config');
const LOGGER = require('../common/logger');

const parseMongooseError = (err) => {
    if (err instanceof Mongoose.Error.CastError
        || err instanceof Mongoose.Error.ValidationError
        || err instanceof Mongoose.Error.ValidatorError) {
        // eslint-disable-next-line no-param-reassign
        err.statusCode = HTTPErrorCodes.BAD_REQUEST;
    } else {
        // eslint-disable-next-line no-param-reassign
        err.statusCode = HTTPErrorCodes.INTERNAL_SERVER_ERROR;
    }
};
const parseMongoError = (err) => {
    if (err.code === 11000) {
        // eslint-disable-next-line no-param-reassign
        err.statusCode = HTTPErrorCodes.CONFLICT;
    } else {
        // eslint-disable-next-line no-param-reassign
        err.statusCode = HTTPErrorCodes.INTERNAL_SERVER_ERROR;
    }
};
const parseError = (err) => {
    console.log(err);
    if (err instanceof Mongoose.Error) {
        parseMongooseError(err);
        // eslint-disable-next-line global-require
    } else if (err instanceof MongoError || err instanceof MongodbMongoError) {
        parseMongoError(err);
    } else if (!err.statusCode) {
        // eslint-disable-next-line no-param-reassign
        err.statusCode = HTTPErrorCodes.INTERNAL_SERVER_ERROR;
    }
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
    parseError(err);
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
};

module.exports = errorHandler;
