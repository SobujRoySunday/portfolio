import mongoose from "mongoose";

/**
 * In dev, Next's hot reload re-evaluates modules on every change, so the
 * in-flight promise is cached on `globalThis` to avoid opening a new pool each
 * time.
 */
const globalWithMongoose = globalThis as typeof globalThis & {
  _mongooseConnection?: Promise<typeof mongoose> | null;
};

const connectToMongoDB = async () => {
  if (mongoose.connection.readyState === 1) return mongoose;

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!globalWithMongoose._mongooseConnection) {
    globalWithMongoose._mongooseConnection = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .catch((error) => {
        // Clear the cache so the next request retries instead of reusing a
        // permanently rejected promise.
        globalWithMongoose._mongooseConnection = null;
        throw error;
      });
  }

  // Never `process.exit` here: a transient database error would take down the
  // whole server, including pages that do not touch the database.
  return globalWithMongoose._mongooseConnection;
};

export default connectToMongoDB;
