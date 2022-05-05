const AreaRouter = require('./area');
const EquipmentInAreaRouter = require('./equipmentInArea');
const SensorRouter = require('./sensor');
const SensorInAreaRouter = require('./sensorInArea');
const SensorSignalRouter = require('./sensorSignal');
const SetupRouter = require('./setup');

module.exports = (app) => {
    app.use('/area', AreaRouter);
    app.use('/eia', EquipmentInAreaRouter);
    app.use('/sensor', SensorRouter);
    app.use('/sia', SensorInAreaRouter);
    app.use('/sensor/:sensorCode/signal', SensorSignalRouter);
    app.use('/', SetupRouter);
};
