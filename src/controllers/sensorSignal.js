const SensorSignalService = require('../services/sensorSignal');

const SensorSignalController = {};

SensorSignalController.addOne = async (req, res) => {
    res.sendFormatted(await SensorSignalService.addOne({ ...req.params, ...req.body }));
};

module.exports = SensorSignalController;
