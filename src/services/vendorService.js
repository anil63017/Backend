const Vendor = require('../models/vendor');

class VendorService {
    vendorDirectory;
    constructor(vendorDB) {
        this.vendorDirectory = vendorDB;
    }

    async getAllVendors() {
        return this.vendorDirectory.find().sort("name").lean();
    }

    async getVendorById(vendorId) {
        return this.vendorDirectory.findOne({ _id: vendorId });
    }

    async getVendorByName(vendorName) {
        return this.vendorDirectory.findOne({ vendorName });
    }

    async addVendor(vendorDetails) {
        return this.vendorDirectory.create(vendorDetails);
    }

    async updateVendor({ vendorId, updates }) {
        const vendor = await this.getVendorById(vendorId);
        if (vendor) {
            await this.vendorDirectory.updateOne({ _id: vendorId }, updates);
            return this.getVendorById(updates.vendorId || vendorId);
        } else {
            return null
        }
    }

    async deleteVendor({ vendorId }) {
        return this.vendorDirectory.destroy({ where: { vendorId } });
    }
}

const vendorService = new VendorService(Vendor)

module.exports = vendorService;