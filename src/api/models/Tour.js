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
const TourSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    image_url: {
        type: String,
        require: true
    },
    activities:{
        type: [ActivitySchema],
        default: undefined
    },
    descriptions: {
        type: String
    },
    vehicle: {
        type: String,
        require: true
    },
    day: {
        type: Number,
        require: true
    },
    night: {
        type: Number,
        require: true
    },
    adult_price: {
        type: Number,
        require: true
    },
    child_price: {
        type: Number,
        require: true
    },
    map_location: {
        type: String,
        require: true
    },
    created_at: {
        type: Date, default: Date.now 
    },
    updated_at: {
        type: Date,
        require: true
    }


})

module.exports = mongoose.model('Tours', TourSchema)