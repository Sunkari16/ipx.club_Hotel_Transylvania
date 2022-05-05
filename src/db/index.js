const AreaSchema = require('./schemas/area');
const ModelNames = require('../constants/model-names');
const DB = require('./db');

module.exports = {
    [ModelNames.AREA]: DB.model(ModelNames.AREA, AreaSchema),
};
