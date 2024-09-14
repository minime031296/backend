const {connect} = require('mongoose')

const connectToDB = async(URL) => {
    try {
        await connect(URL)
    } catch (error) {
        
    }
}

module.exports = connectToDB