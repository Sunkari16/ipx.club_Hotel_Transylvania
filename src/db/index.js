const AreaSchema = require('./schemas/area');
const EquipmentsInArea = require('./schemas/equipmentsInArea');
const ModelNames = require('../constants/model-names');
const DB = require('./db');

module.exports = {
    [ModelNames.AREA]: DB.model(ModelNames.AREA, AreaSchema),
    [ModelNames.EQUIPMENT_IN_AREA]: DB.model(ModelNames.EQUIPMENT_IN_AREA, EquipmentsInArea),
};
