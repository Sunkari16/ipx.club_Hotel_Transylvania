const ModelNames = require('../constants/model-names');
const SensorSignalModel = require('../db')[ModelNames.SENSORS_SIGNAL];
const LOGGER = require('../common/logger');
const SensorInAreaService = require('./sensorInArea');
const EquipmentInAreaService = require('./equipmentInArea');
const { EquipmentCodes, EquipmentStatus } = require('../constants/equimpents');

const SensorSignalService = {};

SensorSignalService.addOne = async (SensorSignal) => {
    const { sensorCode, detectedAt } = SensorSignal;
    const currentTime = new Date().getTime();
    if (detectedAt < currentTime - 2 * 60 * 60 * 1000) {
        LOGGER.warn(
            'Received signal with more than 2 min  delay ',
            { sensorCode, detectedAt, currentTime },
        );
    } else {
        await turnOnLightsInArea(sensorCode);
    }
    return new SensorSignalModel(SensorSignal).save();
};
SensorSignalService.getOneById = async (id) => SensorSignalModel.findById(id).lean();
SensorSignalService.deleteOne = async (id) => SensorSignalModel.deleteOne({ _id: id });
SensorSignalService.getALL = async ({ query = {}, page, limit }) => SensorSignalModel
    .paginate(query, { page, limit, lean: true });

module.exports = SensorSignalService;
