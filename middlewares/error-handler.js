const CustomError = require('../util/custom-error');

module.exports = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(400).json({
            isSuccess: false,
            code: err.code,
            message: err.message
        });
    }
    console.log(err);
    return res.status(500).json(err);
}