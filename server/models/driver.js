const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverSchema = new Schema({
    name: String,
    location: String,
    deliveryId: String
});

module.exports = mongoose.model("Driver", driverSchema);