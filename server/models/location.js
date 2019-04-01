const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    address: String,
    coordinate: Schema.Types.Mixed
});

module.exports = mongoose.model("Location", locationSchema);