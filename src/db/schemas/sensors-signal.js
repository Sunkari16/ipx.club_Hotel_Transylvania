const Schema = require('./base-schema');
const SchemaTypes = require('./schema-types');
const { isDevelopment } = require('../../../config');
/**
 * Sensors are prone to error and needs a frequent replacement,
 * hence creating them as a different entity and mapping to the area.
 * @type {BaseSchema}
 */
const SensorSignalSchema = new Schema({
    // using shortId for easier and readable ID
    sensorCode: SchemaTypes.SHORT_ID,
    // timestamp is expected from the device,
    // that will help us to know if the signal received is too old and act accordingly
    detectedAt: SchemaTypes.MANDATORY_TIMESTAMP,
});
if (isDevelopment) {
    SensorSignalSchema.index({ sensorCode: 1, detectedAt: 1 }, { unique: true });
}

module.exports = SensorSignalSchema;
