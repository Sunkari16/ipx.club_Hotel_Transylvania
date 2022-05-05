const express = require('express');
const SensorController = require('../controllers/sensor');
const { forwardRequest } = require('../common/request-utils');

const SensorRouter = express.Router();

SensorRouter.get('/', forwardRequest(SensorController.getALL));
SensorRouter.post('/', forwardRequest(SensorController.addOne));
SensorRouter.get('/:code', forwardRequest(SensorController.getOne));
SensorRouter.put('/:code', forwardRequest(SensorController.updateOne));
SensorRouter.delete('/:code', forwardRequest(SensorController.deleteOne));

module.exports = SensorRouter;
