import mongosse from "mongoose";
export const connectMongoDB = async () => {
    try {
        mongosse.connect("")
        console.log("Connected to MongoDB")

    } catch (error) {
        console.log(error);
    }
}