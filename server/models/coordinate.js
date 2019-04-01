const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coordinateSchema = new Schema({
    lat: Number,
    lon: Number
});

module.exports = mongoose.model("Coordinate", coordinateSchema);