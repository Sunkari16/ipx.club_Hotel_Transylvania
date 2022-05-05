const express = require('express');
const AreaController = require('../controllers/area');
const { forwardRequest } = require('../common/request-utils');

const AreaRouter = express.Router();

AreaRouter.get('/', forwardRequest(AreaController.getAll));

module.exports = AreaRouter;
