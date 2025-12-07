import{ User } from "../models/users.model.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  try{
    console.log("1. Request received!");
    const { username, email, password} = req.body;

    if(!username || !email || !password){
      return res.status(400).json({message: "All fields are important!"});
    }

    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long!" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }
    console.log("2. Checking DB...");
    const existing = await User.findOne({email: email.toLowerCase()});
    console.log("3. User check done. Result:", existing);
    if(existing){
      return res.status(409).json({message: "User already register! \n Please fill new one!@"}); 
    }

    const user = await User.create({
      username, 
      password, 
      email: email.toLowerCase(),
      loggedIn: false
    });

    res.status(201).json({
      message: "User registered sucessfully!",
      user: {
        id: user._id, 
        email:user.email, 
        username: user.username }
    })
  } catch(error){
    res.status(500).json({message: "Internal server error@",error: error.message});
  }
};

const loginUser = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({
        message: "All fields are required!"
      })
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if(!user) return res.status(404).json({
      message: "User doesn't exist!"
    });

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
      return res.status(400).json({message: "Invalid credentials"})
    };

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: "Log in successfully!",
      user: userResponse
    })
  } catch(error){
    res.status(500).json({
      message: "Internal server Errror!",
      error: error.message
    })
  }
};

const getAllUsers = async (req, res) => {
  try{
    const users = await User.find({});
    res.status(200).json(users);
  } catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}

const updateUser = async (req, res) => {
  try{
    
  } catch(error){

  }
};

export {
  registerUser,
  getAllUsers,
  loginUser
};