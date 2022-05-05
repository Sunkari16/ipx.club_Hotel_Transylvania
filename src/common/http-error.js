class HTTPError extends Error {

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }

}

const HTTPErrorCodes = require('http-status-codes');

module.exports = { HTTPError, HTTPErrorCodes };
