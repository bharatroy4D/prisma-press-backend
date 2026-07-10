import { Router } from "express";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";
import { postController } from "./post.controller";

const router = Router();
router.post('/', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.createPost)
router.get('/', postController.getAllPosts)
router.get('/stats', auth(Role.ADMIN), postController.getPostStats)
router.get('/my-post', auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPost)





export const postRoutes = router;