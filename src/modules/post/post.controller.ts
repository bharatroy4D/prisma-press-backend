import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"

const createPost = catchAsync(async (req: Request, res: Response) => {

});
const getAllPosts = catchAsync(async (req: Request, res: Response) => {

});
const getPostStats = catchAsync(async (req: Request, res: Response) => {

});
const getMyPost = catchAsync(async (req: Request, res: Response) => {

});


export const postController = {
    createPost, getAllPosts, getPostStats, getMyPost
}