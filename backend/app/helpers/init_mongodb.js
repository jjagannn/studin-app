const mongoose = require('mongoose')

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR OWN SERVER
const database = 'test';          // REPLACE WITH YOUR OWN DB NAME

const connectDB = async () => {
    try {
        // await mongoose.connect(`mongodb://${server}/${database}`, {
        await mongoose.connect('mongodb+srv://jagan-admin:Indial00p$@cluster0.wough.mongodb.net/?retryWrites=true&w=majority"', {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false,
            // useCreateIndex: true
        });

        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB();
// require('dotenv').config()
// const MONGODB_URI = process.env.MONGODB_URI;

// async () => {
// await mongoose.connect(process.env.MONGODB_URI, {
//     dbName: process.env.DB_NAME,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
// //   .then(() => {
// //     console.log('mongodb connected.')
// //   })
// //   .catch((err) => console.log(err.message))
// }

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose connected to db')
// })

// mongoose.connection.on('error', (err) => {
//   console.log(err.message)
// })

// mongoose.connection.on('disconnected', () => {
//   console.log('Mongoose connection is disconnected.')
// })

// process.on('SIGINT', async () => {
//   await mongoose.connection.close()
//   process.exit(0)
// })