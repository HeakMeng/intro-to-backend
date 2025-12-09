import { Router } from "express";
import { 
  registerUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser
 } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/:id').patch(verifyJWT,updateUser);
router.route('/:id').delete(verifyJWT,deleteUser);

router.route('/login').post(loginUser);
router.route('/logout').post(verifyJWT,logoutUser);


export default router;