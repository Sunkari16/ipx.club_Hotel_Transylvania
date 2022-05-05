const express = require('express');
const SensorSignalsController = require('../controllers/sensorSignal');
const { forwardRequest } = require('../common/request-utils');

const SensorSignalRouters = express.Router({ mergeParams: true });

SensorSignalRouters.post('/', forwardRequest(SensorSignalsController.addOne));

module.exports = SensorSignalRouters;
