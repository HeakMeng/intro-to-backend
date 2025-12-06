import app from "./app.js";
import  dotenv from "dotenv";
import connectDB from "./config/database.js";

dotenv.config({
  path: './.env',
})

const startServer = async () => {
  try{
    await connectDB();
    app.on("error", (error) => {
      console.log("Error",error);
      throw error;
    });

    app.listen(process.env.PORT || 4569, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  } catch(error){
    console.log("MongoDB connection failed!",error);
  }
};

startServer();