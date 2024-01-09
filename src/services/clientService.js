const Client = require('../models/client');

class ClientService {
    clientDirectory;
    constructor(vendorDB) {
        this.clientDirectory = vendorDB;
    }

    async getAllClients() {
        return this.clientDirectory.find().sort("name").lean();
    }

    async getClientById(clientId) {
        return this.clientDirectory.findOne({ clientId });
    }

    async getClientName(clientName) {
        return this.clientDirectory.findOne({ clientName });
    }

    async addClient(clientDetails) {
        return this.clientDirectory.create(clientDetails);
    }

    async deleteClient({ clientId }) {
        return this.clientDirectory.destroy({ where: { clientId } });
    }
}

const clientService = new ClientService(Client)

module.exports = clientService;