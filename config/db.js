const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("dataBase Connected")
    } catch(e) {
        console.log("DataBase Connected Error : ", e.message)
    }
}

module.exports = connectDB;