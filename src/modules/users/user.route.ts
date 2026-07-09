import { Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { sendResponse } from "../../utils/sendResponse";
import Http1Options from "node:http2";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", userController.RegisterUser);
router.get('/me', auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile);
router.put('/my-profile', userController.updateMyProfile)
export const userRouter = router;