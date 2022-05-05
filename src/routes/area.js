const express = require('express');
const AreaController = require('../controllers/area');
const { forwardRequest } = require('../common/request-utils');

const AreaRouter = express.Router();

AreaRouter.get('/', forwardRequest(AreaController.getALL));

AreaRouter.get('/', forwardRequest(AreaController.getALL));
AreaRouter.post('/', forwardRequest(AreaController.addOne));
AreaRouter.get('/:code', forwardRequest(AreaController.getOne));
AreaRouter.put('/:code', forwardRequest(AreaController.updateOne));
AreaRouter.delete('/:code', forwardRequest(AreaController.deleteOne));

module.exports = AreaRouter;
