const _ = require('lodash');
const ModelNames = require('../constants/model-names');
const { validateAddArea } = require('../validators/area');
const AreaModel = require('../db')[ModelNames.AREA];

const AreaService = {
};
AreaService.addOne = async (area) => {
    validateAddArea(area);
    const areaModel = new AreaModel(area);
    return areaModel.save();
};

AreaService.getAreaByCode = async (code) => AreaModel.findOne({ code }).lean();

AreaService.updateAreaByCode = async (code, updates) => {
    const area = AreaModel.findOne({ code });
    if (_.has(updates, 'maxConsumptionUnits')) {
        area.maxConsumptionUnits = updates.maxConsumptionUnits;
    }
    if (_.has(updates, 'autoTurnOffTTLInSec')) {
        area.autoTurnOffTTLInSec = updates.autoTurnOffTTLInSec;
    }
    validateAddArea(area);
    return area.save();
};

AreaService.deleteAreaByCode = async (code) => AreaModel.deleteOne({ code });

AreaService.getALL = async ({ query = {}, page, limit }) => AreaModel
    .paginate(query, { page, limit, lean: true });

module.exports = AreaService;
