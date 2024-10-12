import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  cart: {
    type: Array,
    default: [],
  },
  isAdmin: Boolean,
  order: {
    type: Array,
    default: [],
  },
  favItems: {
    type: Array,
    default: [],
  },
  contact: Number,
  picture: String,
});

export default mongoose.model("User", userSchema);
