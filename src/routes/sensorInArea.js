const express = require('express');
const SensorInAreaController = require('../controllers/sensorsInArea');
const { forwardRequest } = require('../common/request-utils');

const SensorInAreaRouter = express.Router();

SensorInAreaRouter.get('/', forwardRequest(SensorInAreaController.getALL));
SensorInAreaRouter.post('/', forwardRequest(SensorInAreaController.addOne));
SensorInAreaRouter.get('/:id', forwardRequest(SensorInAreaController.getOne));
SensorInAreaRouter.put('/:id', forwardRequest(SensorInAreaController.updateOne));
SensorInAreaRouter.delete('/:id', forwardRequest(SensorInAreaController.deleteOne));

module.exports = SensorInAreaRouter;
