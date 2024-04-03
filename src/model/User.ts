import mongoose, { Document } from "mongoose";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: string;

    isValidPassword(password: string): Promise<Error | boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);



export default mongoose.model("User", userSchema);

// photo: {
//   type: String,
// },