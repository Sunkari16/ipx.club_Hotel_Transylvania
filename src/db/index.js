const AreaSchema = require('./schemas/area');
const EquipmentInAreaSchema = require('./schemas/equipmentsInArea');
const SensorSchema = require('./schemas/sensors');
const sensorInAreaSchema = require('./schemas/sensorInArea');
const SensorSignalSchema = require('./schemas/sensors-signal');
const ModelNames = require('../constants/model-names');
const DB = require('./db');

module.exports = {
    [ModelNames.AREA]: DB.model(ModelNames.AREA, AreaSchema),
    [ModelNames.EQUIPMENT_IN_AREA]: DB.model(ModelNames.EQUIPMENT_IN_AREA, EquipmentInAreaSchema),
    [ModelNames.SENSORS]: DB.model(ModelNames.SENSORS, SensorSchema),
    [ModelNames.SENSORS_IN_AREA]: DB.model(ModelNames.SENSORS_IN_AREA, sensorInAreaSchema),
    [ModelNames.SENSORS_SIGNAL]: DB.model(ModelNames.SENSORS_SIGNAL, SensorSignalSchema),
};
