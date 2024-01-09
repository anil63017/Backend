const accessMiddleware = require('../middleware/accessMiddleware');
const vendorService = require('../services/vendorService');
const { RESOURCES, PERMISSIONS } = require('../util/iam-helper');

const vendorRouter = require('express').Router();

vendorRouter.get('/list', accessMiddleware(RESOURCES.VENDOR_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    try {
        const result = await vendorService.getAllVendors();
        res.json(result);
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

vendorRouter.get('/:id', accessMiddleware(RESOURCES.VENDOR_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    if (req.params.id) {
        const result = await vendorService.getVendorById(req.params.id);
        if (result) {
            res.json(result);
            return;
        }
    }
    res.status(404)
    res.json({ message: 'vendor not found' });
});

vendorRouter.post('/create', accessMiddleware(RESOURCES.VENDOR_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const vendorDetails = req.body;
        if (vendorDetails) {
            const newVendor = await vendorService.addVendor(vendorDetails);
            res.json(newVendor);
        }
    } catch (e) {
        res.status(500);
        res.json({ message: "something went wrong!", error: e.toString() })
    }
});

vendorRouter.put('/:id', accessMiddleware(RESOURCES.VENDOR_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const { id: vendorId } = req.params;
        const updates = req.body;
        if (updates) {
            const updateVendor = await vendorService.updateVendor({ vendorId, updates });
            if (!updateVendor) {
                res.json({ status: false, message: 'Bad Request' }).status(400)
            }
            res.json(updateVendor);
        }
    } catch (e) {
        res.status(500).json({ message: "something went wrong!", error: e.toString() })
    }
});


module.exports = vendorRouter;