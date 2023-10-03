import mongoose from 'mongoose';

const userCollection = "users"

const userSchema = new mongoose.Schema({
  email:{type: String, unique: true, max: 100, required: true},
  password: {type: String, max: 100, required: true},
  last_connection:{type: String}
})

export const userModel = mongoose.model(userCollection, userSchema);