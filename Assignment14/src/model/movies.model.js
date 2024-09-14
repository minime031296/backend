const mongoose = require('mongoose')
const {Schema, model, Decimal128} = mongoose
const {v4: uuidv4} = require('uuid')

const movieSchema = new Schema({
    movieId:{
        type: String,
        default: uuidv4
    },
    title: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        validate: {
            validator: function(value) {
                const validRoles = ["actor", "actress", "director"]
                return value.every(role => validRoles.includes(role))
            },
            message: props => `Invalid role(s) in cast: ${props.value}` 
        }
    },
    rating: {
        type: Decimal128,

    }
})

const Movies = new model("movie", movieSchema)

module.exports = Movies