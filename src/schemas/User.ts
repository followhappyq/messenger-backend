import mongoose, { Schema, Document } from "mongoose"
import isEmail from "validator/lib/isEmail"

export interface IUser extends Document {
  email: string
  login: string
  password: string
  confirmed: boolean
  avatar: string
  confirm_hash: string
  last_seen: Date
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      require: "E-mail adress is required",
      validate: [isEmail, "Invalid email"],
      unique: true,
    },
    login: {
      type: String,
      required: "Login is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirmed_hash: String,
    last_seen: Date,
  },
  {
    timestamps: true,
  }
)

const UserModel = mongoose.model<IUser>("User", UserSchema)

export default UserModel
