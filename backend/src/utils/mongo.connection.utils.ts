import mongoose from 'mongoose';
const dbServer = process.env.DB_SERVER as string;

async function connectDB() {

    mongoose.connect(dbServer, (err) => {
        if (err) {
            console.log("[MongoDB] Initial connection error! Check db server!");
        } else {
            console.log("[MongoDB] Database connection established successfully.");
        }
    });

    mongoose.connection.on('disconnected', () => {
        console.log("[MongoDB] Database disconnected!");
    });

    mongoose.connection.on('reconnected', () => {
        console.log("[MongoDB] Database reconnected!");
    });

    mongoose.connection.on('error', async err => {
        console.log("[MongoDB] Database error!");
        console.log(err)
    });
}

export default connectDB;