import mongoose from "mongoose"

let isconnected = false

export const connectDB = async () =>{
    mongoose.set('strictQuery', true)

    if(isconnected){
        console.log("MongoDB is running")
        return
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI as string)

        isconnected = true
        console.log("MongoDB Connected")
    }catch(err){
        console.log(err)
    }
}