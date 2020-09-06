const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    num: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },

})

module.exports = mongoose.model('Activity', ActivitySchema)