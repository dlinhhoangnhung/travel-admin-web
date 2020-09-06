const mongoose = require('mongoose');
const Tour = require('./Tour');

// const BookingItem = mongoose.Schema({
//     tourId: {
//         type: String,
//         require: true
//     },
//     type: {
//         type: String,
//         require: true
//     },
//     quantity: {
//         type: Number,
//         require: true
//     },

// })
const BookingSchema = mongoose.Schema({
    uid: {
        type: String,
        require: true
    },

    booking_description: {
        type: String,
        require: true
    },
    booking_items: {
        type: [{
            tour_id: {
                type: String,
                require: true
            },
            type: {
                type: String,
                require: true
            },
            quantity: {
                type: Number,
                require: true
            },

        }],
        default: undefined
    },
    status: {
        type: String,
        require: true
    },
    total: {
        type: Number,
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

module.exports = mongoose.model('Booking', BookingSchema)