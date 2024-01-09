const passport = require('passport');
const authStrategy = require('../config/passport');

passport.use(authStrategy);

function authMiddleware(req, res, next) {
    passport.authenticate('jwt', { session: false }, function authCallback(err, user) {
        if (err) { return next(err) }
        if (!user) { return res.status(401).json({ message: 'You are not Authorized!', status: false }) }
        req.user = user
        next();
    })(req, res, next)
}

module.exports = authMiddleware;