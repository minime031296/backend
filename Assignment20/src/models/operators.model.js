const {Schema, model} = require('mongoose')

const operatorSchema = new Schema({
    name: {
        type: String, required: true, unique: true
    },
    contact_info: {
        type: String, required: true
    },
    buses: [{
        type: Schema.Types.ObjectId , ref: "Bus"
    }]
})

const Operator = model('Operator', operatorSchema)

module.exports = Operator




