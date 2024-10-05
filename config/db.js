import mongoose from "mongoose";

export const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION)
        console.log(`connected to database ${mongoose.connection.host}`)    
    }catch(err){
        console.log(err)
    }
}