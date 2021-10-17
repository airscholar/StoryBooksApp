import mongoose from "mongoose";

export interface UserInterface {
  googleId: string;
  email: string;
  display_name: string;
  first_name: string;
  last_name: string;
  image: string;
  created_at: Date;
}

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
