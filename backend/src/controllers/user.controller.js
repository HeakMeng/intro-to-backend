import { User } from "../models/users.model.js";

const registerUser = async (req, res) => {
  try{
    const { username, email, password} = req.body;

    if(!username || !email || !password){
      return res.status(400).json({message: "All fields are important!"});
    }
    
    const existing = await User.findOne({email: email.toLowerCase()});
    if(existing){
      return res.status(400).json({message: "User already register! \n Please fill new one!@"}); 
    }

    const user = await User.create({
      username, 
      password, 
      email: email.toLowerCase(),
      loggedIn: false
    });

    res.status(201).json({
      message: "User registered sucessfully!",
      user: {id: user._id, email:user.email, username: user.username }
    })
  } catch(error){
    res.status(500).json({message: "Internal server error@",error: error.message});
  }
};

export {
  registerUser
}