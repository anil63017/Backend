const accessMiddleware = require('../middleware/accessMiddleware');
const immigrationService = require('../services/immigrationService');
const { RESOURCES, PERMISSIONS } = require('../util/iam-helper');

const immigrationRouter = require('express').Router();

immigrationRouter.get('/list', accessMiddleware(RESOURCES.IMMIGRATION_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    const result = await immigrationService.getImmigrationEntries();
    res.json(result);
});

immigrationRouter.post('/create', accessMiddleware(RESOURCES.IMMIGRATION_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    if (req.body?.employeeId) {
        try {
            const result = await immigrationService.addImmigrationEntry(req.body);
            res.json(result);
            return
        }
        catch (e) {
            res.status(500);
            res.json({ message: "something went wrong!", error: e.toString() })
        }
    } else {
        res.status(400)
        res.json({ message: "missing required immigration details!" })
    }
});

immigrationRouter.put('/bulk', accessMiddleware(RESOURCES.IMMIGRATION_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const updates = req.body
        if (updates) {
            await immigrationService.updateImmigrationEntries(updates);
        }
        res.json({ status: true });
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

immigrationRouter.get('/:id', accessMiddleware(RESOURCES.IMMIGRATION_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    if (req.params.id) {
        const result = await immigrationService.getImmigrationEntryById({ employeeId: req.params.id });
        if (result) {
            res.json(result);
            return;
        }
    }
    res.status(404)
    res.json({ message: 'user not found' });
});

module.exports = immigrationRouter;