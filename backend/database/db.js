// for DB connection
import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "pintrest",
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

export default connectDb;