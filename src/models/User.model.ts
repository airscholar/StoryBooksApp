import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true },
  display_name: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  image: { type: String },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
