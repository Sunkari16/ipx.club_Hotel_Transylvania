const AreasService = require('../services/area');

const AreaController = { };
AreaController.getAddOne = async (req, res) => {
    res.sendFormatted(await AreasService.addOne(req.body));
};

AreaController.updateOne = async (req, res) => {
    res.sendFormatted(await AreasService.updateAreaByCode(req.params.code, req.body));
};

AreaController.getOne = async (req, res) => {
    res.sendFormatted(await AreasService.getAreaByCode(req.params.code));
};

AreaController.deleteOne = async (req, res) => {
    res.sendFormatted(await AreasService.deleteAreaByCode(req.params.code));
};

AreaController.getALL = async (req, res) => {
    const {
        docs,
        total,
        limit,
        page,
        pages,
    } = await AreasService.getALL({ page: req.query.page });
    res.sendFormatted({
        data: docs,
        meta: {
            total, limit, page, pages,
        },
    });
};

module.exports = AreaController;
