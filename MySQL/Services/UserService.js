const { User } = require('../Models');
const sequelize = require('sequelize');
const CutomError = require('../../util/custom-error');

const userService = {
    isIdUnique: async (value) => {
        try {
            const result = await User.findOne({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                where: {
                    user_id: value
                }
            })

            if (result.dataValues.count == 0) return true;
            else return false;
        } catch (err) {
            throw err;
        }
    },

    isEmailUnique: async (value) => {
        try {
            const result = await User.findOne({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                where: {
                    email: value
                }
            })

            if (result.dataValues.count == 0) return true
            else return false;
        } catch (err) {
            throw err;
        }
    },

    isNicknameUnique: async (value) => {
        try {
            const result = await User.findOne({
                attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
                where: {
                    nickname: value
                }
            })

            if (result.dataValues.count == 0) return true
            else return false;
        } catch (err) {
            throw err;
        }
    },

    createUser: async (user_id, password, email, name, gender, age, nickname) => {
        try {
            const user = await User.create({
                user_id: user_id,
                password: password,
                email: email,
                name: name,
                gender: gender,
                age: age,
                nickname: nickname
            })

            return user;
        } catch (err) {
            throw err;
        }
    },

    allUser: async () => {
        try {
            const allUser = await User.findAll();

            return allUser;
        } catch (exception) {
            throw exception;
        }
    },

    userInfo: async (userId) => {
        try {
            const userInfo = await User.findOne({
                attributes: ['id', 'name', 'age', 'married', 'comment'],
                where: {
                    id: userId
                }
            })

            return userInfo;
        } catch (exception) {
            throw exception;
        }
    },

    updateUser: async (userId, comment) => {
        try {
            await User.update({
                comment: comment,
            }, {
                where: {
                    id: userId
                }
            });

            return true;
        } catch (exception) {
            throw exception;
        }
    },

    deleteUser: async (userId) => {
        try {
            await User.destroy({
                where: {
                    id: userId
                }
            });

            return true;
        } catch (exception) {
            throw exception;
        }
    }
}

module.exports = userService;