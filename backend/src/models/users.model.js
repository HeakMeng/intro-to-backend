import bcrypt from "bcryptjs";
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required@"],
      unique: true,
      lowercase: true,
      minLength: [3, "Username must be at least 3 characters!"],
      maxLength: 50,
      index: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true, 
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters@"],
      select: false,
      naxLength: 50
    }
  },
  {
    timestamps: true
  }
);
userSchema.pre("save", async function(){
  if(!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
})
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);