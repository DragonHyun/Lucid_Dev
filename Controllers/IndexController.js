const mailer = require('../util/mail.js');
const jwt = require('../util/jwt');

const indexController = {
    success: (req, res, next) => {
        res.status(200).json(
            {
                "success": true,
                "message": "You make success"
            }
        );
    },

    sendEmail: (req, res, next) => {
        const { email } = req.body;

        const emailParam = {
            toEmail: email,
            subject: 'Email test',
            text: 'send email test'
        };

        mailer.sendGmail(emailParam);

        res.status(200).json(
            {
                "success": true,
                "message": "메일 전송 성공"
            }
        )
    },

    paramName: (req, res, next) => {
        const name = req.params.name;

        if (!name) {
            return res.status(400).json({ err: '이름 없음' });
        }

        res.status(200).json(
            {
                "success": true,
                "message": 'param 예제',
                "result": `Hello ${name}`
            }
        )
    },

    querystring: (req, res, next) => {
        const queryString = req.query.name;

        if (!queryString) {
            return res.status(400).json({ err: 'queryString 없음' });
        }

        res.status(200).json(
            {
                "success": true,
                "message": 'queryString 예제',
                "result": queryString
            }
        )
    },

    message: (req, res, next) => {
        const message = req.body.message || '';

        if (!message.length) {
            return res.status(400).json({ err: 'There are no message' });
        }

        res.status(200).json(
            {
                "success": true,
                "message": "메시지를 잘 받았습니다",
                "result": message
            }
        )
    },

    getJwt: async (req, res, next) => {
        const user = { id: 312, email: 'aaa' };

        const jwtToken = await jwt.createToken(user);

        res.status(200).json({
            "result": jwtToken
        })
    },

    verifyJwt: async (req, res, next) => {
        try {
            const user = req.user;
            res.status(200).json(
                {
                    "result": user
                }
            )
        } catch (err) {
            throw (err);
        }
    },
}

module.exports = indexController;