import { Router } from "express";
import { authenticate } from "../../middlewares/auth.js";
import { getMe } from "../../controllers/user/user.js";

export const userRouter = Router();

userRouter.get('/me', authenticate, getMe);