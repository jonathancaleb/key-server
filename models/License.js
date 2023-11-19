const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
    key: { type: String, required: true },
    // Other fields you might need
});

const License = mongoose.model('License', LicenseSchema);

module.exports = License;
