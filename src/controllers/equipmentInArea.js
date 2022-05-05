const EquipmentInAreaService = require('../services/equipmentInArea');
const { parseGetFilters } = require('../common/request-utils');

const EquipmentInAreaController = {};

EquipmentInAreaController.getAddOne = async (req, res) => {
    res.sendFormatted(await EquipmentInAreaService.addOne(req.body));
};

EquipmentInAreaController.updateOne = async (req, res) => {
    res.sendFormatted(await EquipmentInAreaService.updateOne(req.params.id, req.body));
};

EquipmentInAreaController.getOneById = async (req, res) => {
    res.sendFormatted(await EquipmentInAreaService.getOneById(req.params.id));
};

EquipmentInAreaController.deleteOne = async (req, res) => {
    res.sendFormatted(await EquipmentInAreaService.deleteOne(req.params.id));
};

EquipmentInAreaController.getALL = async (req, res) => {
    const {
        docs,
        total,
        limit,
        page,
        pages,
    } = await EquipmentInAreaService.getALL(parseGetFilters(req));
    res.sendFormatted({
        data: docs,
        meta: {
            total, limit, page, pages,
        },
    });
};

module.exports = EquipmentInAreaController;
