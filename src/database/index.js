const mongoose = require("mongoose")

connectDb()

async function connectDb() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ecommercedb")
        console.log("Database Connected");
    } catch (error) {
        console.log("Error connecting to database");
        console.log(error);
    }
}