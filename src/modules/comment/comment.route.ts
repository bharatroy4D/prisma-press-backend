import { Router } from "express";
import { commentController } from "./comment.controller";
import { auth } from "../../middleware/auth.middleware";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get('/:commentId', commentController.getCommentBycommentId)
router.patch('/:commentId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateComment)
router.delete('/:commentId', auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteComment)
router.put('/:commentId/moderate', auth(Role.ADMIN), commentController.moderateComment)

export const commentRoutes = router;
