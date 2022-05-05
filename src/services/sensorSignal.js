const ModelNames = require('../constants/model-names');
const SensorSignalModel = require('../db')[ModelNames.SENSORS_SIGNAL];
const LOGGER = require('../common/logger');
const EquipmentControllerService = require('./equipment-controller-service');

const SensorSignalService = {};

SensorSignalService.addOne = async ({ sensorCode, detectedAt = Date.now() }) => {
    const currentTime = new Date().getTime();
    if (detectedAt < currentTime - 2 * 60 * 60 * 1000) {
        LOGGER.warn(
            'Received signal with more than 2 min  delay, not turning on lights ',
            { sensorCode, detectedAt, currentTime },
        );
    } else {
        EquipmentControllerService.handleMotionDetected(sensorCode).catch((e) => {
            LOGGER.error('Error occurred while setting signal ', e);
        });
    }
    return new SensorSignalModel(({ sensorCode, detectedAt })).save();
};
SensorSignalService.getOneById = async (id) => SensorSignalModel.findById(id).lean();
SensorSignalService.deleteOne = async (id) => SensorSignalModel.deleteOne({ _id: id });
SensorSignalService.getALL = async ({ query = {}, page = 1, limit = 20 }) => SensorSignalModel
    .paginate(query, { page, limit, lean: true });
SensorSignalService.deleteAll = async () => SensorSignalModel.deleteMany({});
module.exports = SensorSignalService;
