const { UserService } = require('../MySQL/Services');
const { logger } = require('../config/winston');
const passport = require('passport');
const jwt = require('../util/jwt');

const CustomError = require('../util/custom-error');
const { isDefined } = require('../util/function');

const userController = {

    checkUnique: async (req, res, next) => {
        const { type, value } = req.body;
        let isUnique;
        //value(id, email, nickname)에 대한 validate 실시 후 unique검사
        try {
            if (!await isDefined(type, value)) {
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
        const { userId, password, email, name, gender, age, nickname, isUnique } = req.body;
        try {
            if (!await isDefined(userId, password, email, name, gender, age, nickname, isUnique)) {
                throw new CustomError(450, '필수 요소가 존재 하지 않습니다.');
            }
            if (!isUnique) {
                //중복검사를 했으면 validation 검사도 한것임.
                throw new CustomError(400, '중복 검사를 실시하지 않았습니다.');
            }

            await UserService.createUser(userId, password, email, name, gender, age, nickname);

            res.status(200).json({
                isSuccess: true,
                code: 200,
                message: "회원가입 성공"
            })
        } catch (err) {
            next(err);
        }
    },

    signIn: async (req, res, next) => {
        const { userId, password } = req.body;
        try {
            if (!await isDefined(userId, password)) {
                throw new CustomError(450, '필수요소가 없습니다.');
            }
            passport.authenticate('local', { session: false }, (err, user, info) => {
                if (err || !user)
                    return res.status(400).json({
                        isSuccess: false,
                        code: 401,
                        message: info.message
                    })
                req.login(user, { session: false }, async (error) => {
                    if (error) next(error);
                    const token = await jwt.createToken(user);
                    console.log(token);
                    return res.status(200).json({
                        isSuccess: true,
                        code: 200,
                        message: "login 성공",
                        result: token
                    });
                });
            })(req, res)

        } catch (err) {
            next(err);
        }
    },

    modifyUser: async (req, res, next) => {
        const { type, value } = req.body;
        const uid = req.user.id;
        let isUpdated;
        try {
            if (!await isDefined(type, value)) {
                throw new CustomError(450, "필수요소가 없습니다.");
            }

            switch (type) {
                case "password":
                    isUpdated = await UserService.updatePassword(uid, value);
                    break;
                case "nickname":
                    if (! await UserService.isNicknameUnique(value)) {
                        throw new CustomError(440, "닉네임이 중복됩니다.");
                    }
                    isUpdated = await UserService.updateNickname(uid, value);
                    break;
                default:
                    throw new CustomError(450, "올바르지 않은 type입니다.");
            }

            if (!isUpdated) {
                throw new CustomError(401, "정보수정에 실패했습니다.");
            }

            res.status(200).json({
                isSuccess: true,
                code: 200,
                message: "회원정보 수정 성공"
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
}

module.exports = userController;