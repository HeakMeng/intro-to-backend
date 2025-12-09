import { Router } from "express";
import { 
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser
 } from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/:id').patch(updateUser);
router.route('/:id').delete(deleteUser);

router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser);


export default router;