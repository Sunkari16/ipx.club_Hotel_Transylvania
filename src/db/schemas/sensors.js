const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
/**
 * Sensors are prone to error and needs a frequent replacement,
 * hence creating them as a different entity and mapping to the area.
 * @type {BaseSchema}
 */
const SensorSchema = new Schema({
    // using shortId for easier and readable ID
    code: SchemaTypes.SHORT_ID,
    // macId keeping it optional for this setup. In real world scenario this should be mandatory
    macId: SchemaTypes.OPTIONAL_STRING,
    lastSignalDetectedAT: { ...SchemaTypes.MANDATORY_TIMESTAMP, default: 0 },
});
if (isDevelopment) {
    SensorSchema.index({ code: 1 }, { unique: true });
}

module.exports = SensorSchema;
