const {Schema, model} = require('mongoose')


const reservationSchema = new Schema({
    bus: [{
        type: Schema.Types.ObjectId, ref: "Bus"
    }],
    passenger: [{
        type: Schema.Types.ObjectId, ref: "Passenger"
    }],
    seat_number: {
        type: [Number]
    },
    reservation_date: {
        type: Date, default: date.now()
    }
})

const Reservation = model('Reservation', reservationSchema)

module.exports = Reservation