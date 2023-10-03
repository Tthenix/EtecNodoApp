import dotenv from "dotenv";


dotenv.config();


export default{
  port: process.env.PORT,
  mongourl: process.env.MONGODB_URI,
}