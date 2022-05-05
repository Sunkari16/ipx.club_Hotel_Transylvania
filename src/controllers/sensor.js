const SensorService = require('../services/sensor');

const SensorController = { };
SensorController.addOne = async (req, res) => {
    res.sendFormatted(await SensorService.addOne(req.body));
};

SensorController.updateOne = async (req, res) => {
    res.sendFormatted(await SensorService.updateOneByCode(req.params.code, req.body));
};

SensorController.getOne = async (req, res) => {
    res.sendFormatted(await SensorService.getOneByCode(req.params.code));
};

SensorController.deleteOne = async (req, res) => {
    res.sendFormatted(await SensorService.deleteOneByCode(req.params.code));
};

SensorController.getALL = async (req, res) => {
    const {
        docs,
        total,
        limit,
        page,
        pages,
    } = await SensorService.getALL({ page: req.query.page });
    res.sendFormatted({
        data: docs,
        meta: {
            total, limit, page, pages,
        },
    });
};

module.exports = SensorController;
