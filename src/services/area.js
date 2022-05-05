const _ = require('lodash');
const ModelNames = require('../constants/model-names');
const { validateAddArea } = require('../validators/area');
const AreaModel = require('../db')[ModelNames.AREA];

const addOne = async (area) => {
    validateAddArea(area);
    const areaModel = new AreaModel(area);
    return areaModel.save();
};

const getAreaByCode = async (code) => AreaModel.findOne({ code }).lean();

const updateAreaByCode = async (code, updates) => {
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

const getAreas = async ({ query = {}, page, limit }) => AreaModel
    .paginate(query, { page, limit, lean: true });

module.exports = {
    addOne, getAreaByCode, updateAreaByCode, getAreas,
};
