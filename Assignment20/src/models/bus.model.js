const {Schema, model} = require('mongoose')

const busSchema = new Schema({
    bus_number: {
        type: String, unique: true, required: true
    },
    capacity: {
        type: Number, max: 10, required: true
    },
    operator: [{
        type: Schema.Types.ObjectId, ref: "Operator"
    }],
    route: [{
        type: Schema.Types.ObjectId, ref: "Route"
    }],
    reservations: [{
        type: Schema.Types.ObjectId, ref: "Reservation"
    }]
})

const Bus = model('Bus', busSchema)

module.exports = Bus
