const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const User = require('../models/user');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

function verifyCallabck(payload, done) {
    User.findOne({ _id: payload.sub })
        .then((user) => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }).catch((err) => done(err, false))
}

module.exports = new JwtStrategy(options, verifyCallabck);