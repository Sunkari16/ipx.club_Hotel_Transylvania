const express = require('express');
const SetupControllerController = require('../controllers/setup');
const { forwardRequest } = require('../common/request-utils');

const SetupRouter = express.Router({ mergeParams: true });

SetupRouter.post('/setup', forwardRequest(SetupControllerController.setup));
SetupRouter.post('/reset', forwardRequest(SetupControllerController.reset));
SetupRouter.get('/monitor', forwardRequest(SetupControllerController.monitor));

module.exports = SetupRouter;
