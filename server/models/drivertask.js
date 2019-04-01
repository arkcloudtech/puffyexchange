const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverTaskSchema = new Schema({
    location: Schema.Types.Mixed
});

module.exports = mongoose.model("DriverTask", driverTaskSchema);