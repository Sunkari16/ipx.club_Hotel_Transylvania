const { HTTPError, HTTPErrorCodes } = require('../common/http-error');

function validateLastSignalReceivedAt(lastSignalReceivedAt) {
    if (!lastSignalReceivedAt || lastSignalReceivedAt > new Date().getTime()) {
        throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid Equipment Status');
    }
}
module.exports = { validateLastSignalReceivedAt };
