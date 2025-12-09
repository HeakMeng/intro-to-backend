import { Router } from "express";
import { 
  registerUser ,
  getAllUsers,
  loginUser,
  updateUser
 } from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/:id').patch(updateUser);

router.route('/login').post(loginUser);


export default router;