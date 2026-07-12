import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.services";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus from "http-status";
const createPost = catchAsync(async (req: Request, res: Response) => {
    const id = req.user?.id;
    const payload = req.body;

    const result = await postService.createPostIntoDB(payload, id as string)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "Post create is successfully",
        data: { result }

    })
});
const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const result = await postService.getAllPostsFromDB();

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: "All Posts retrived is successfully",
        data: result
    })
});
const getPostStats = catchAsync(async (req: Request, res: Response) => {

});
const getMyPost = catchAsync(async (req: Request, res: Response) => {

});
const getPostById = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId;
    if (!postId) {
        throw new Error("PostId is required")
    }

    const result = await postService.getPostByIdIntoDB(postId as string);
    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Post retrived is successfully',
        data: result
    })
});
const updatePost = catchAsync(async (req: Request, res: Response) => {

});
const deletePost = catchAsync(async (req: Request, res: Response) => {

});


export const postController = {
    createPost, getAllPosts, getPostStats,
    getMyPost, getPostById, updatePost, deletePost
}