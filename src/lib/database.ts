// import mongoose, { Connection } from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//     throw new Error("MONGODB_URI is not defined.");
// }

// // Global cache to prevent multiple connections
// interface CachedMongoose {
//     conn: Connection | null;
//     promise: Promise<typeof mongoose> | null;
// }

// declare global {
//     var mongoose: CachedMongoose | undefined;
// }

// let cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

// if (!global.mongoose) {
//     global.mongoose = cached;
// }

// export const connectDB = async (): Promise<typeof mongoose> => {
//     if (cached.conn) {
//         console.log("Using cached MongoDB connection");
//         return mongoose;
//     }

//     if (!cached.promise) {
//         const options = {
//             bufferCommands: false,
//             serverSelectionTimeoutMS: 30000,
//             socketTimeoutMS: 30000,
//         };

//         cached.promise = mongoose.connect(MONGODB_URI, options).then((mongooseInstance) => {
//             console.log("MongoDB Connected");
//             cached.conn = mongooseInstance.connection;
//             return mongooseInstance;
//         });
//     }

//     try {
//         await cached.promise;
//     } catch (err) {
//         cached.promise = null;
//         console.error("MongoDB connection error:", err);
//         throw err;
//     }

//     return mongoose;
// };
