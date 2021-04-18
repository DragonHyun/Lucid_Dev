const passport = require('passport');
const passportJWT = require('passport-jwt');
const bcrypt = require('bcrypt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../MySQL/Models');
const { secretKey, options } = require('../../config/secretkey');

const LocalStrategyOption = {
    usernameField: "userId",
    passwordField: "password"
};
const localVerify = async (userId, password, done) => {
    try {
        const user = await User.findOne({ where: { user_id: userId } });

        if (!user) return done(null, false, { message: "아이디가 존재 하지 않습니다." });
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (!isSamePassword)
            return done(null, false, { message: "비밀번호가 틀렸습니다." });
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}

const jwtStrategyOption = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
}
async function jwtVerify(payload, done) {
    let user;
    try {
        user = await User.findOne({ where: { id: payload.id } });
        if (!user) return done(null, false);
    } catch (err) {
        return done(err);
    }
    return done(null, user);
}

module.exports = () => {
    passport.use('local', new LocalStrategy(LocalStrategyOption, localVerify));
    passport.use('jwt', new JWTStrategy(jwtStrategyOption, jwtVerify));
};