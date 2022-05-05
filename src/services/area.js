const _ = require('lodash');
const ModelNames = require('../constants/model-names');
const { validateAddArea } = require('../validators/area');
const AreaModel = require('../db')[ModelNames.AREA];

const AreaService = {};
AreaService.addOne = async ({
    code,
    floor,
    areaType,
    maxConsumptionUnits,
    autoTurnOffTTLInMS,
    defaultOnEquipments,
}) => {
    validateAddArea({
        code,
        floor,
        areaType,
        maxConsumptionUnits,
        autoTurnOffTTLInMS,
        defaultOnEquipments,
    });
    const areaModel = new AreaModel({
        code,
        floor,
        areaType,
        maxConsumptionUnits,
        autoTurnOffTTLInMS,
        defaultOnEquipments,
    });
    return areaModel.save();
};

AreaService.getAreaByCode = async (code) => AreaModel.findOne({ code }).lean();

AreaService.updateAreaByCode = async (code, updates) => {
    const area = AreaModel.findOne({ code });
    if (_.has(updates, 'maxConsumptionUnits')) {
        area.maxConsumptionUnits = updates.maxConsumptionUnits;
    }
    if (_.has(updates, 'autoTurnOffTTLInMS')) {
        area.autoTurnOffTTLInMS = updates.autoTurnOffTTLInMS;
    }
    validateAddArea(area);
    return area.save();
};

AreaService.deleteAreaByCode = async (code) => AreaModel.deleteOne({ code });

AreaService.getALL = async ({ query = {}, page = 1, limit = 20 }) => AreaModel
    .paginate(query, { page, limit, lean: true });

AreaService.deleteAll = async () => AreaModel.deleteMany({});
module.exports = AreaService;
