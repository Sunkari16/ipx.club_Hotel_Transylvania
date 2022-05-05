const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
const { EquipmentCodes } = require('../../constants/equimpents');

const EquipmentInAreaSchema = new Schema({
    areaCode: SchemaTypes.MANDATORY_STRING,
    equipmentCode: SchemaTypes.MANDATORY_ENUM(Object.values(Object.values(EquipmentCodes))),
    status: SchemaTypes.MANDATORY_ENUM(Object.values(Object.values(EquipmentCodes))),
});
if (isDevelopment) {
    EquipmentInAreaSchema.index({ code: 1 });
}

module.exports = EquipmentInAreaSchema;
