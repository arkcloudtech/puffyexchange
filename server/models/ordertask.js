const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderTaskSchema = new Schema({
    driverTaskId: String,
    summary: String
});

module.exports = mongoose.model("OrderTask", orderTaskSchema);