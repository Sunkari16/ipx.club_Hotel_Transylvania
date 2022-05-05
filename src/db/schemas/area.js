const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
const { AreaTypes } = require('../../constants/area');
const { EquipmentCodes } = require('../../constants/equimpents');

const AreasSchema = new Schema({
    code: SchemaTypes.MANDATORY_STRING,
    floor: SchemaTypes.MANDATORY_NUMBER,
    areaType: SchemaTypes.MANDATORY_ENUM(Object.values(AreaTypes)),
    maxConsumptionUnits: SchemaTypes.MANDATORY_NUMBER,
    autoTurnOffTTLInSec: SchemaTypes.MANDATORY_NUMBER,
    defaultOnEquipments: SchemaTypes.MANDATORY_ENUM(Object.values(EquipmentCodes)),
});
if (isDevelopment) {
    AreasSchema.index({ code: 1 });
}

module.exports = AreasSchema;
