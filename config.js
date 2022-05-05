const Envs = require('./src/constants/envs');
const AppConstants = require('./src/constants/app');

const ENVIRONMENT = process.env.NODE_ENV || Envs.development;
const isProduction = ENVIRONMENT === Envs.production;
const isDevelopment = ENVIRONMENT === Envs.development;
const APP_NAME = process.env.APP_NAME || AppConstants.NAME;

module.exports = {
    appName: APP_NAME,
    environment: ENVIRONMENT,
    isDevelopment,
    isProduction,
    log: {
        level: process.env.LOG_LEVEL || (isProduction ? 'debug' : 'silly'),
        name: 'ld-api',
    },
    mongo: {
        auto_index: isDevelopment,
        debug: isProduction,
        url: process.env.MONGOURL || 'mongodb://mongo:27017/ht',
        useCreateIndex: true,
        useNewUrlParser: true,
    },
    port: process.env.PORT || 3000,
};
