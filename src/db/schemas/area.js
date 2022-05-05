const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');

const AreasSchema = new Schema({
    code: SchemaTypes.MANDATORY_STRING,
    maxConsumptionUnits: SchemaTypes.MANDATORY_NUMBER,
    autoTurnOffTTLInSec: SchemaTypes.MANDATORY_NUMBER,
});
if (isDevelopment) {
    AreasSchema.index({ code: 1 });
}

module.exports = AreasSchema;
