const _ = require('lodash');
const ModelNames = require('../constants/model-names');
const {
    validateEquipmentInArea,
    validateEquipmentStatus,
} = require('../validators/equipmentInArea');
const { Equipments } = require('../constants/equimpents');
const { HTTPError, HTTPErrorCodes } = require('../common/http-error');
const EquipmentInAreaModel = require('../db')[ModelNames.EQUIPMENT_IN_AREA];

const EquipmentInAreaService = {};
EquipmentInAreaService.addOne = async ({ areaCode, equipmentCode, status }) => {
    validateEquipmentInArea({ areaCode, equipmentCode, status });
    const EquipmentInArea = new EquipmentInAreaModel({ areaCode, equipmentCode, status });
    return EquipmentInArea.save();
};
EquipmentInAreaService.getOneById = async (id) => EquipmentInAreaModel.findById(id).lean();

EquipmentInAreaService.getEquipmentsInArea = async (areaCode) => EquipmentInAreaModel
    .find({ areaCode }).lean();

EquipmentInAreaService.updateOne = async (id, { status }) => {
    if (status) {
        validateEquipmentStatus(status);
        return EquipmentInAreaModel
            .updateOne({ _id: id }, { $set: { status } });
    }
    throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid update body');
};

EquipmentInAreaService.getUnitsConsumedByEquipment = (equipmentCode) => (Equipments[equipmentCode]
    ? Equipments[equipmentCode].noOfUnits : undefined);

EquipmentInAreaService.deleteOne = async (id) => EquipmentInAreaModel.deleteOne({ _id: id });

EquipmentInAreaService.getALL = async ({ query = {}, page = 1, limit = 20 }) => EquipmentInAreaModel
    .paginate(query, { page, limit, lean: true });

EquipmentInAreaService.bulkUpdateByID = async (ids, { status }) => {
    if (status) {
        validateEquipmentStatus(status);
        return EquipmentInAreaModel
            .updateMany({ _id: { $in: ids } }, { $set: { status } });
    }
    throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid status');
};

EquipmentInAreaService.deleteAll = async () => EquipmentInAreaModel.deleteMany({});
module.exports = EquipmentInAreaService;
