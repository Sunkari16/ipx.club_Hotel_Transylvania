const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
const { AREA_TYPES } = require('../../constants/area');
const { EquipmentCodes } = require('../../constants/equimpents');

const AreasSchema = new Schema({
    code: SchemaTypes.MANDATORY_STRING,
    floor: SchemaTypes.MANDATORY_NUMBER,
    areaType: SchemaTypes.MANDATORY_ENUM(Object.values(AREA_TYPES)),
    maxConsumptionUnits: SchemaTypes.MANDATORY_NUMBER,
    autoTurnOffTTLInMS: SchemaTypes.MANDATORY_NUMBER,
    defaultOnEquipments: [SchemaTypes.MANDATORY_ENUM(Object.values(EquipmentCodes))],
});
if (isDevelopment) {
    AreasSchema.index({ code: 1 }, { unique: true });
}
module.exports = AreasSchema;
