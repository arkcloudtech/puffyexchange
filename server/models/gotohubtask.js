const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const goToHubTaskSchema = new Schema({
    driverTaskId: String
});

module.exports = mongoose.model("GoToHubTask", goToHubTaskSchema);