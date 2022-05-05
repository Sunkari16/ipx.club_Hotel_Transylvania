const _ = require('lodash');
const ModelNames = require('../constants/model-names');
const { validateEquipmentInArea, validateEquipmentStatus } = require('../validators/equipmentInArea');
const { EquipmentStatus, Equipments } = require('../constants/equimpents');
const EquipmentInAreaModel = require('../db')[ModelNames.EQUIPMENT_IN_AREA];

const addOne = async (equipmentInArea) => {
    validateEquipmentInArea(equipmentInArea);
    const EquipmentInArea = new EquipmentInAreaModel(equipmentInArea);
    return EquipmentInArea.save();
};

const getEquipmentsInArea = async (areaCode) => EquipmentInAreaModel.find({ areaCode }).lean();

const turnOnEquipmentInArea = async (id, status) => {
    validateEquipmentStatus(status);
    return EquipmentInAreaModel
        .updateOne({ _id: id }, { $set: { status } });
};

const turnOffEquipmentInArea = async (id) => EquipmentInAreaModel
    .updateOne({ _id: id }, { $set: { status: EquipmentStatus.OFF } });

const getUnitsConsumedByEquipment = (equipmentCode) => (Equipments[equipmentCode]
    ? Equipments[equipmentCode].noOfUnits : undefined);

const deleteOne = async (id) => EquipmentInAreaModel.deleteOne({ _id: id });

module.exports = {
    addOne,
    deleteOne,
    getEquipmentsInArea,
    turnOnEquipmentInArea,
    turnOffEquipmentInArea,
    getUnitsConsumedByEquipment,
};
