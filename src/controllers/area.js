const { getAreas } = require('../services/area');

const getAll = async (req, res) => {
    const {
        docs,
        total,
        limit,
        page,
        pages,
    } = await getAreas({ page: req.query.page });
    res.sendFormatted({
        data: docs,
        meta: {
            total, limit, page, pages,
        },
    });
};
const AreaController = { getAll };
module.exports = AreaController;
