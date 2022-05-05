const { HTTPError, HTTPErrorCodes } = require('../common/http-error');

function validateAreaCode(code) {
    if (!code) {
        throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid Area code');
    }
}

function validateMaxConsumptionUnits(maxConsumptionUnits) {
    if (maxConsumptionUnits < 0) {
        throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid maxConsumptionUnits');
    }
}

function validateAutoTurnOffTTLInSec(autoTurnOffTTLInSec) {
    if (autoTurnOffTTLInSec < 1) {
        throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid autoTurnOffTTLInSec');
    }
}

const validateAddArea = (area) => {
    const { code, maxConsumptionUnits, autoTurnOffTTLInSec } = area;

    validateAreaCode(code);
    validateMaxConsumptionUnits(maxConsumptionUnits);
    validateAutoTurnOffTTLInSec(autoTurnOffTTLInSec);
};

module.exports = { validateAreaCode, validateAddArea };
