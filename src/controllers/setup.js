const SetupService = require('../services/setup');

const SetupServiceController = {};

SetupServiceController.setup = async (req, res) => {
    res.send((await SetupService.setup(req.body)));
};

SetupServiceController.reset = async (req, res) => {
    res.send((await SetupService.reset(req.body)));
};
SetupServiceController.monitor = async (req, res) => {
    res.send((await SetupService.monitor()));
};
module.exports = SetupServiceController;
