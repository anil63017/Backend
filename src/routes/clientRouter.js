const accessMiddleware = require('../middleware/accessMiddleware');
const clientService = require('../services/clientService');
const { RESOURCES, PERMISSIONS } = require('../util/iam-helper');

const clientRouter = require('express').Router();

clientRouter.get('/list', accessMiddleware(RESOURCES.CLIENT_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    try {
        const result = await clientService.getAllVendors();
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

clientRouter.get('/:id', accessMiddleware(RESOURCES.CLIENT_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    if (req.params.id) {
        const result = await clientService.getVendorById(req.params.id);
        if (result) {
            res.json(result);
            return;
        }
    }
    res.status(404)
    res.json({ message: 'client not found' });
});

clientRouter.post('/create', accessMiddleware(RESOURCES.CLIENT_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const vendorDetails = req.body;
        if (vendorDetails) {
            const newClient = await clientService.addClient(vendorDetails);
            res.json(newClient);
        }
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

module.exports = clientRouter;