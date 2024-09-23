const {Schema, model} = require('mongoose')


const passengerSchema = new Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, unique: true, required: true
    },
    phone: {
        type: String, required: true
    },
    reservations: [{
        type: Schema.Types.ObjectId, ref: "reservation"
    }]
})

const Passenger = model('Passenger', passengerSchema)

module.exports = Passenger
