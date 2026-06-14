const mongoose = require('mongoose');

const certSchema = mongoose.Schema({
    id : String
})

const certModel = mongoose.model('certificates', certSchema);

module.exports = certModel;