const forwardRequest = (handler) => async (req, res, next) => {
    try {
        await handler(req, res, next);
    } catch (e) {
        next(e);
    }
};

function parseGetFilters(req) {
    const { page } = req.query;
    delete req.query.page;
    const query = { ...req.query };
    return { query, page };
}
module.exports = { forwardRequest, parseGetFilters };
