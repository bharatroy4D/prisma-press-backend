import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();
router.post('/login', authController.userLogin);
router.post('/refreshToken', authController.refreshToken)

export const authRoutes = router;