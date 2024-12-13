import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const connection = async ()=>{
    mongoose.connect(process.env.MongoUrl).then(()=>{
    console.log("Connection was successful")
}).catch((err)=>{
    console.log("The database was not connected : ", err);
})}

export default connection
