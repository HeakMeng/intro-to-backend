import { Router } from "express";
import { registerUser ,getAllUsers,loginUser } from "../controllers/user.controller.js";

const router = Router();

router.route('/').get(getAllUsers);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;