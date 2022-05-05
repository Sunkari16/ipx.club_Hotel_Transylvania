const AreaRouter = require('./area');
const EquipmentInAreaRouter = require('./equipmentInArea');

module.exports = (app) => {
    app.use('/area', AreaRouter);
    app.use('/eia', EquipmentInAreaRouter);
};
