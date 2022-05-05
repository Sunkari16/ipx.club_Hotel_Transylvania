const express = require('express');
const EquipmentInAreaController = require('../controllers/equipmentInArea');
const { forwardRequest } = require('../common/request-utils');

const EquipmentInAreaRouter = express.Router();

EquipmentInAreaRouter.get('/', forwardRequest(EquipmentInAreaController.getALL));
EquipmentInAreaRouter.post('/', forwardRequest(EquipmentInAreaController.addOne));
EquipmentInAreaRouter.get('/:id', forwardRequest(EquipmentInAreaController.getOneById));
EquipmentInAreaRouter.put('/:id', forwardRequest(EquipmentInAreaController.updateOne));
EquipmentInAreaRouter.delete('/:id', forwardRequest(EquipmentInAreaController.deleteOne));

module.exports = EquipmentInAreaRouter;
