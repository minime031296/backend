const {Schema, model} = require('mongoose')

const routeSchema = new Schema({
    start_location: {
        type: String, required: true
    },
    end_location: {
        type: String, required: true
    },
    distance: {
        type: Number, required: true
    },
    bus: [{
      type: Schema.Types.ObjectId, ref: "Bus"  
    }]
})

const Route = model('Route', routeSchema)

module.exports = Route