const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
/**
 * with this model we can scale to multiple sensors in an area
 * Also will be able to support replacing a faulty sensor
 * @type {BaseSchema}
 */
const sensorInAreaSchema = new Schema({
    // using shortId for easier and readable ID
    sensorCode: SchemaTypes.SHORT_ID,
    areaCode: SchemaTypes.MANDATORY_STRING,
});
if (isDevelopment) {
    sensorInAreaSchema.index({ areaCode: 1 });
    sensorInAreaSchema.index({ sensorCode: 1 }, { unique: true });
}

module.exports = sensorInAreaSchema;
