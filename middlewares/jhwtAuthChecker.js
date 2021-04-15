const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

const authChecker = {
    checkToken: async (req, res, next) => {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json(
                {
                    "isSuccess": false,
                    "code": 401,
                    "message": "There are no Token"
                }
            );
        }

        const user = await jwt.verifyToken(token);

        if (user === TOKEN_INVALID || user === TOKEN_EXPIRED || user.id === undefined) {
            return res.status(200).json(
                {
                    "isSuccess": false,
                    "code": 401,
                    "message": "Invalid Token"
                }
            );
        } else {
            req.user = user;
            next();
        }
    }
}

module.exports = authChecker;