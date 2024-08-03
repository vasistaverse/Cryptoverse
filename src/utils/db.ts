import mongoose from "mongoose";

const uri = process.env.NEXT_MONGODB_URI || "";
const dbName = process.env.NEXT_MONGODB_URI

let cachedClient : any = null
let cachedDb: any = null

if(!uri){
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env'
    )
}
if(!dbName){
    throw new Error(
        'Please define the MONGODB_DB environment variable inside .env'
    )
}

const connectToDB = async () => {
  try {
    if(cachedClient && cachedDb){
        return {client: cachedClient, db: cachedDb}
    }
    const mongodbUri = process.env.NEXT_MONGODB_URI;
    console.log(mongodbUri)
    if(!mongodbUri){
        throw new Error("MONGODB_URI not defined in environment varaibles")
    }
    const client = await mongoose.connect(mongodbUri);
    const db = client.connection.db
    cachedClient = client
    cachedDb = db
    return {client, db}
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

export default connectToDB;
