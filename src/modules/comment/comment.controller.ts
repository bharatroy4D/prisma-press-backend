import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"

const getCommentBycommentId = catchAsync(async (req: Request, res: Response) => {

})
const updateComment = catchAsync(async (req: Request, res: Response) => {

})
const deleteComment = catchAsync(async (req: Request, res: Response) => {

})
const moderateComment = catchAsync(async (req: Request, res: Response) => {

})

export const commentController = {
getCommentBycommentId, updateComment, deleteComment, moderateComment
}