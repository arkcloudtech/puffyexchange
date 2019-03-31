const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    userId: String,
    isApproved: Boolean,
    location: String
});

module.exports = mongoose.model("Driver", driverSchema);