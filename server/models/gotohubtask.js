const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goToHubTaskSchema = new Schema({
    driverTaskId: String,
    summary: String
});

module.exports = mongoose.model("GoToHubTask", goToHubTaskSchema);