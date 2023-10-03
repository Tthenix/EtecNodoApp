import mongoose from "mongoose";
import { mongourl } from "../app.js";

export async function connectMongo() {
  try {
    mongoose.set("strictQuery", false);
    console.log(mongourl);
    await mongoose.connect(mongourl);
    console.log("¡Conectado pa!");

  } catch (error) {
    console.log(error);
  }
}