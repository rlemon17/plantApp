const mongoose = require('mongoose');
const plant = require('./plant.model.js');

const userSchema = new mongoose.Schema({
    name: {type: String},
    plants: [plant.plantSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
