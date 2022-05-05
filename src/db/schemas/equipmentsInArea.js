const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
const { EquipmentCodes } = require('../../constants/equimpents');
/**
 * models helps in scalling to custom no of equimpements in an area
 * @type {BaseSchema}
 */
const EquipmentInAreaSchema = new Schema({
    areaCode: SchemaTypes.MANDATORY_STRING,
    equipmentCode: SchemaTypes.MANDATORY_ENUM(Object.values(Object.values(EquipmentCodes))),
    status: SchemaTypes.MANDATORY_ENUM(Object.values(Object.values(EquipmentCodes))),
});
if (isDevelopment) {
    EquipmentInAreaSchema.index({ areaCode: 1 });
}

module.exports = EquipmentInAreaSchema;
