const { hasAccess } = require("../util/iam-helper");

function accessMiddleware(resource, permission_level) {
    return function checkAccess(req, res, next) {
        const isAuthorized = req.user && hasAccess(req.user.access, resource, permission_level);
        if (isAuthorized) {
            return next();
        }
        res.status(401).json({ message: 'You are not Authorized!', status: false });
    }
}

module.exports = accessMiddleware;