const ModelNames = require('../constants/model-names');
const { HTTPError, HTTPErrorCodes } = require('../common/http-error');
const SensorInAreaModel = require('../db')[ModelNames.SENSORS_IN_AREA];

const SensorInAreaService = {};
SensorInAreaService.addOne = async (SensorInArea) => {
    new SensorInAreaModel(SensorInArea).save();
};
SensorInAreaService.getOneById = async (id) => SensorInAreaModel.findById(id).lean();

SensorInAreaService.updateOne = async (id, { sensorCode }) => {
    if (sensorCode) {
        return SensorInAreaModel
            .updateOne({ _id: id }, { $set: { sensorCode } });
    }
    throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid update body');
};

SensorInAreaService.deleteOne = async (id) => SensorInAreaModel.deleteOne({ _id: id });
SensorInAreaService.getALL = async ({ query = {}, page, limit }) => SensorInAreaModel
    .paginate(query, { page, limit, lean: true });

module.exports = SensorInAreaService;
