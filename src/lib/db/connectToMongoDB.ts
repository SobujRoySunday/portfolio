import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    // check if the database is already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB: ", mongoose.connection.host);
      return;
    }

    const MONGODB_URI = process.env.MONGODB_URI || "";
    const response = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully:", response.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectToMongoDB;
