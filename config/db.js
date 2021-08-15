const mongoose = require('mongoose')
const dotenv = require('dotenv')


const connectDB = async () => {
    console.log(process.env.MONGO_URI)
    try {
        const conn = await mongoose.connect("mongodb+srv://test1234:test1234@cluster0.yygfa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{  
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
        })

        console.log(`MONGODB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB