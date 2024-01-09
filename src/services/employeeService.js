const Employee = require('../models/employee');

class EmployeeService {
    employeeDirectory;
    constructor(employeeDB) {
        this.employeeDirectory = employeeDB;
    }

    async getAllEmployee() {
        return this.employeeDirectory.find().sort("employeeId").lean();
    }

    async getEmployeeById(employeeId) {
        return this.employeeDirectory.findOne({ employeeId });
    }

    async getLastEmployeeId(onBoarding) {
        return this.employeeDirectory.
            find({ onBoarding }).
            sort({ employeeId: -1 }).
            select({ employeeId: 1 }).limit(1).findOne()
    }

    async isValidEmployee(employeeId) {
        return this.employeeDirectory.exists({ employeeId });
    }

    async addEmployee(employeeDetails) {
        if (!employeeDetails.employeeId) {
            const seed_type = employeeDetails.onBoarding ? 'E' : 'T';
            let seed_prefix = employeeDetails.onBoarding ? 19000 : 1000;
            const lastId = await this.getLastEmployeeId(employeeDetails.onBoarding);
            console.log('last', lastId);
            if (lastId) {
                seed_prefix = Number(lastId.employeeId.replace(seed_type, ''))
            }
            employeeDetails.employeeId = seed_type + (seed_prefix + 1);
        }
        return this.employeeDirectory.create(employeeDetails);
    }

    async updateEmployee({ employeeId, updates }) {
        const employee = await this.getEmployeeById(employeeId);
        if (employee) {
            if (updates.onBoarding && !employee.onBoarding) {
                const lastEmployee = await this.getLastEmployeeId(updates.onBoarding);
                let lastId =  19000
                if(lastEmployee?.employeeId){
                    lastId = Number(lastEmployee?.employeeId.replace('E', ''))
                }
                updates.employeeId = 'E' + lastId + 1;
            }
            await this.employeeDirectory.updateOne({ employeeId }, updates);
            return this.getEmployeeById(updates.employeeId || employeeId);
        } else {
            return null
        }
    }

    async updateEmployeeBulk(updates) {
        const bulkUpdates = Object.keys(updates || {}).map((employeeId) => {
            return {
                updateOne: {
                    filter: { employeeId },
                    update: { $set: { ...updates[employeeId] } },
                }
            }
        })
        if (bulkUpdates?.length) {
            console.log(JSON.stringify(bulkUpdates))
            await this.employeeDirectory.bulkWrite(bulkUpdates)
        }
    }

    async deleteEmployee({ employeeId }) {
        return this.employeeDirectory.destroy({ where: { employeeId } });
    }
}

const employeeService = new EmployeeService(Employee)

module.exports = employeeService;