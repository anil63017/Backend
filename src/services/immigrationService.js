const Immigration = require('../models/immigration');
const employeeService = require('./employeeService');

class ImmigrationService {
    immigrationDirectory;
    constructor(immigrationCollection) {
        this.immigrationDirectory = immigrationCollection;
    }

    async getImmigrationEntries() {
        return await this.immigrationDirectory.find().sort("employeeId").lean();
    }

    async getImmigrationEntryById(employeeId) {
        return await this.immigrationDirectory.findOne({ employeeId });
    }

    async addImmigrationEntry(immigrationDetails) {
        const linkedEmployee = await employeeService.isValidEmployee(immigrationDetails.employeeId);
        if (linkedEmployee) {
            const immigrationEntry = await this.immigrationDirectory.create(immigrationDetails);
            return immigrationEntry
        } else {
            return false
        }
    }

    async updateImmigrationEntries(updates) {
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
            await this.immigrationDirectory.bulkWrite(bulkUpdates)
        }
    }

}

const immigrationService = new ImmigrationService(Immigration)

module.exports = immigrationService;