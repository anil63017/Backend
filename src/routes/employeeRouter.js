const employeeService = require('../services/employeeService');
const { RESOURCES, PERMISSIONS } = require('../util/iam-helper');
const immigrationRouter = require('./immigrationRouter');
const accessMiddleware = require('../middleware/accessMiddleware');
const employeeRouter = require('express').Router();

employeeRouter.use('/immigration', immigrationRouter);

employeeRouter.get('/lastId', async (req, res) => {
    const result = await employeeService.getLastEmployeeId(false);
    return res.json(result)
})

employeeRouter.get('/list', accessMiddleware(RESOURCES.EMPLOYEE_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    try {
        const result = await employeeService.getAllEmployee();
        res.json(result);
    } catch (e) {
        res.status(500).json({ message: "something went wrong!", error: e.toString() })
    }
});

employeeRouter.get('/:id', accessMiddleware(RESOURCES.EMPLOYEE_DIRECTORY, PERMISSIONS.READ), async (req, res) => {
    if (req.params.id) {
        const result = await employeeService.getEmployeeById(req.params.id);
        if (result) {
            res.json(result);
            return;
        }
    }
    res.status(404)
    res.json({ message: 'user not found' });
});

employeeRouter.post('/create', accessMiddleware(RESOURCES.EMPLOYEE_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const employeeDetails = req.body;
        if (employeeDetails) {
            const newEmployee = await employeeService.addEmployee(employeeDetails);
            res.json(newEmployee);
        }
    } catch (e) {
        res.status(500).json({ message: "something went wrong!", error: e.toString() })
    }
});


employeeRouter.put('/bulk', accessMiddleware(RESOURCES.EMPLOYEE_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const updates = req.body
        if (updates) {
            await employeeService.updateEmployeeBulk(updates);
        }
        res.json({ status: true });
    } catch (e) {
        res.status(500).json({ message: "something went wrong!", error: e.toString() })
    }
});

employeeRouter.put('/:id', accessMiddleware(RESOURCES.EMPLOYEE_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const { id: employeeId } = req.params;
        const updates = req.body;
        if (updates) {
            const updatedEmployee = await employeeService.updateEmployee({ employeeId, updates });
            if (!updatedEmployee) {
                res.json({ status: false, message: 'Bad Request' }).status(400)
            }
            res.json(updatedEmployee);
        }
    } catch (e) {
        res.status(500).json({ message: "something went wrong!", error: e.toString() })
    }
});

employeeRouter.delete('/:id', accessMiddleware(RESOURCES.EMPLOYEE_DIRECTORY, PERMISSIONS.WRITE), async (req, res) => {
    try {
        const { id: employeeId } = req.params;
        const updatedEmployee = await employeeService.deleteEmployee({ employeeId });
        res.json(updatedEmployee);
    } catch (e) {
        res.status(500).json({ message: "something went wrong!", error: e.toString() })
    }
});

module.exports = employeeRouter;