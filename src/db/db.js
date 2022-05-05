const mongoose = require('mongoose');
const Config = require('../../config');
const LOGGER = require('../common/logger');

const mongoConnectionUrl = Config.mongo.url;
const DB = mongoose.createConnection(mongoConnectionUrl);
mongoose.set('debug', true);
DB.on('connected', () => {
    LOGGER.info(`Connected to db url ${mongoConnectionUrl}`);
});
DB.on('reconnected', () => {
    LOGGER.info(`Reconnected to db url ${mongoConnectionUrl}`);
});
DB.on('error', () => {
    LOGGER.info(`Error connecting to db url ${mongoConnectionUrl}`);
});
DB.on('disconnected', () => {
    LOGGER.info(`Disconnected connecting to db url ${mongoConnectionUrl}`);
});

module.exports = DB;
