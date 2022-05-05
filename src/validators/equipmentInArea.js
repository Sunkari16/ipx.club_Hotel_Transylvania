const { validateAreaCode } = require('./area');
const { EquipmentStatus } = require('../constants/equimpents');
const { HTTPError, HTTPErrorCodes } = require('../common/http-error');

const validateEquipmentInArea = (eip) => {
    const { areaCode } = eip;
    validateAreaCode(areaCode);
};
const validateEquipmentStatus = (status) => {
    if (Object.values(EquipmentStatus).indexOf(status) === -1) {
        throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid Equipment Status');
    }
};
module.exports = { validateEquipmentInArea, validateEquipmentStatus };
