const CustomError = require('../util/custom-error');
const { logger } = require('../config/winston');

module.exports = (err, req, res, next) => {
    const errObj = {
        req: {
            headers: req.headers,
            query: req.query,
            body: req.body,
            route: req.route
        },
        error: {
            message: err.message,
            stack: err.stack,
            status: err.status
        }
    }

    if (err instanceof CustomError) {
        logger.error(errObj);
        return res.status(400).json({
            isSuccess: false,
            code: err.code,
            message: err.message
        });
    }
    console.log(err);
    logger.error(errObj);
    return res.status(500).json(err);
}