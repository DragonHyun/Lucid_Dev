const { UserService } = require('../MySQL/Services');
const { logger } = require('../config/winston');
const CustomError = require('../util/custom-error');

const userController = {

    checkUnique: async (req, res, next) => {
        const { type, value } = req.body;
        let isUnique;
        //value(id, email, nickname)에 대한 validate 실시 후 unique검사
        try {
            if (typeof type == 'undefined' || typeof value == 'undefined') {
                throw new CustomError(450, '필수 요소가 존재 하지 않습니다.');
            }

            switch (type) {
                case "id":
                    isUnique = await UserService.isIdUnique(value);
                    break;
                case "email":
                    isUnique = await UserService.isEmailUnique(value);
                    break;
                case "nickname":
                    isUnique = await UserService.isNicknameUnique(value);
                    break;
                default:
                    throw new CustomError(440, 'type이 올바르지 않습니다.');
            }

            res.status(200).json({
                isSuccess: true,
                code: 200,
                message: `${type} type unique 여부 확인 성공`,
                result: isUnique
            })

        } catch (err) {
            next(err);
        }
    },

    signUp: async (req, res, next) => {
        const { user_id, password, email, name, gender, age, nickname, isUnique } = req.body;

        try {
            if (user_id == undefined || password == undefined || email == undefined || name == undefined || gender == undefined || age == undefined || nickname == undefined || isUnique == undefined) {
                throw new CustomError(450, '필수 요소가 존재 하지 않습니다.');
            }
            if (!isUnique) {
                //중복검사를 했으면 validation 검사도 한것임.
                throw new CustomError(400, '중복 검사를 실시하지 않았습니다.');
            }

            await UserService.createUser(user_id, password, email, name, gender, age, nickname);

            res.status(200).json({
                isSuccess: true,
                code: 200,
                message: "회원가입 성공"
            })
        } catch (err) {
            next(err);
        }
    },

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
        const { user_id, password, email, name, gender, age, nickname } = req.body;

        try {
            const result = await UserService.createUser(user_id, password, email, name, gender, age, nickname);
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