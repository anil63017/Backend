const router = require('express').Router();
const employeeRouter = require('./employeeRouter');
const vendorRouter = require('./vendorRouter');
const clientRouter = require('./clientRouter');
const workRouter = require('./workRouter');
const authRouter = require('./authRouter');
const authMiddleware = require('../middleware/authMiddleware');


router.use('/v1/employee', authMiddleware, employeeRouter);
router.use('/v1/vendor', authMiddleware, vendorRouter);
router.use('/v1/client', authMiddleware, clientRouter);
router.use('/v1/worklog', authMiddleware, workRouter);
router.use('/v1/auth', authRouter);

module.exports = router;