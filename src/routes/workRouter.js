const accessMiddleware = require('../middleware/accessMiddleware');
const workService = require('../services/workService');
const { RESOURCES, PERMISSIONS } = require('../util/iam-helper');

const workRouter = require('express').Router();

workRouter.get('/list', accessMiddleware(RESOURCES.WORKING_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    try {
        const result = await workService.getWorkLogs();
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

workRouter.get('/:id', accessMiddleware(RESOURCES.WORKING_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    if (req.params.id) {
        const result = await workService.getWorkLogById(req.params.id);
        if (result) {
            res.json(result);
            return;
        }
    }
    res.status(404)
    res.json({ message: 'client not found' });
});

workRouter.post('/create', accessMiddleware(RESOURCES.WORKING_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const workDetails = req.body;
        if (workDetails) {
            const newWorkLog = await workService.addWorkLog(workDetails);
            res.json(newWorkLog);
        }
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

module.exports = workRouter;