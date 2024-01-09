const WorkLog = require('../models/worklog');

class WorkService {
    worklogDirectory;
    constructor(workLogDB) {
        this.worklogDirectory = workLogDB;
    }

    async getWorkLogs() {
        return this.worklogDirectory.find().sort('employeeId').lean()
    }

    async getWorkLogById(worklogId) {
        return this.worklogDirectory.findOne({ worklogId });
    }

    async addWorkLog(worklog) {
        return this.worklogDirectory.create(worklog);
    }

    async deleteWorkLog({ worklogId }) {
        return this.worklogDirectory.destroy({ where: { worklogId } });
    }
}

const workService = new WorkService(WorkLog)

module.exports = workService;