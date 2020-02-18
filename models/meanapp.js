const mongoose = require('mongoose');

const meanAppsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('MeanApp', meanAppsSchema, 'meanapps');