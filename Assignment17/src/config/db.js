const {connect} = require('mongoose')

const connectToDb = async(URL) => {
    try {
        await connect(URL)
    } catch (error) {
        
    }
}
module.exports = connectToDb