const AreaRouter = require('./area');

module.exports = (app) => {
    app.use('/area', AreaRouter);
};
