const SensorInAreaService = require('../services/sensorInArea');
const { parseGetFilters } = require('../common/request-utils');

const SensorInAreaController = {};

SensorInAreaController.addOne = async (req, res) => {
    res.sendFormatted(await SensorInAreaService.addOne(req.body));
};

SensorInAreaController.updateOne = async (req, res) => {
    res.sendFormatted(await SensorInAreaService.updateOne(req.params.id, req.body));
};

SensorInAreaController.getOne = async (req, res) => {
    res.sendFormatted(await SensorInAreaService.getOneById(req.params.id));
};

SensorInAreaController.deleteOne = async (req, res) => {
    res.sendFormatted(await SensorInAreaService.deleteOne(req.params.id));
};

SensorInAreaController.getALL = async (req, res) => {
    const {
        docs,
        total,
        limit,
        page,
        pages,
    } = await SensorInAreaService.getALL(parseGetFilters(req));
    res.sendFormatted({
        data: docs,
        meta: {
            total, limit, page, pages,
        },
    });
};

module.exports = SensorInAreaController;
