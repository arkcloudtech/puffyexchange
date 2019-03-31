const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverTaskSchema = new Schema({
    taskId: String,
    location: String
});

module.exports = mongoose.model("DriverTask", driverTaskSchema);