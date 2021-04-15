const { UserService } = require('../MySQL/Services');
const { logger } = require('../config/winston');

const userController = {
    allUser: async (req, res, next) => {
        try {
            const allUser = await UserService.allUser();
            res.status(200).json({
                isSuccess: true,
                message: "모든 사용자 정보 조회 성공",
                result: allUser
            });
        } catch (err) {
            res.status(500).json({
                isSuccess: false,
                message: err,
                result: null
            });
        }
    },

    getUserInfo: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const userInfo = await UserService.userInfo(userId);

            res.status(200).json({
                isSuccess: true,
                message: "특정 사용자 정보 조회 성공",
                result: userInfo
            });
        } catch (err) {
            res.status(500).json({
                isSuccess: false,
                message: err,
                result: null
            });
        }
    },

    createUser: async (req, res, next) => {
        const { name, age, married, comment } = req.body;

        try {
            const result = await UserService.createUser(name, age, married, comment);
            if (result) {
                res.status(201).json({
                    isSuccess: true,
                    message: "유저 생성 성공"
                })
            }
        } catch (err) {
            res.status(500).json({
                isSuccess: false,
                message: err
            })
            next(err);
        }
    },

    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const { comment } = req.body;

        try {
            const result = await UserService.updateUser(userId, comment);
            if (result) {
                res.status(202).json({
                    isSuccess: true,
                    message: "유저 수정 성공"
                })
            }
        } catch (err) {
            res.status(500).json({
                isSuccess: false,
                message: err
            })
        }
    },

    deleteUser: async (req, res, next) => {
        const { userId } = req.params;

        try {
            const result = await UserService.deleteUser(userId);
            if (result) {
                res.status(200).json({
                    isSuccess: true,
                    message: "유저 삭제 성공"
                })
            }
        } catch (err) {
            res.status(500).json({
                isSuccess: false,
                message: err
            })
        }
    }
}

module.exports = userController;