const _ = require('lodash');
const ModelNames = require('../constants/model-names');
const { validateLastSignalReceivedAt } = require('../validators/sensors');
const { HTTPError, HTTPErrorCodes } = require('../common/http-error');
const SensorModel = require('../db')[ModelNames.SENSORS];

const SensorService = {};
SensorService.addOne = async (sensor) => new SensorModel(sensor).save();
SensorService.getOneByCode = async (code) => SensorModel.findOne({ code }).lean();
SensorService.deleteOneByCode = async (code) => SensorModel.deleteOne({ code }).lean();
SensorService.updateOneByCode = async (code, { lastSignalReceivedAt }) => {
    if (lastSignalReceivedAt) {
        validateLastSignalReceivedAt(lastSignalReceivedAt);
        return SensorModel.updateOne({ code }, { $set: { lastSignalReceivedAt } });
    }
    throw new HTTPError(HTTPErrorCodes.BAD_REQUEST, 'Invalid update');
};
SensorService.getALL = async ({ query = {}, page = 1, limit = 20 }) => SensorModel
    .paginate(query, { page, limit, lean: true });
SensorService.deleteAll = async () => SensorModel.deleteMany({});
module.exports = SensorService;
