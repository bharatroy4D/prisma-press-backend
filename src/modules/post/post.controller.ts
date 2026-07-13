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
    const authorId = req.user?.id;
    const result = await postService.getMyPost(authorId as string);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'My Post retrived is successfully',
        data: result
    })

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
    const postId = req.params.postId;
    const authorId = req.user?.id;
    const isAdmin = req.user?.role === "ADMIN";
    const payload = req.body;

    const result = await postService.updatePostIntoDB(postId as string, authorId as string, payload, isAdmin);

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Post Updated successfully',
        data: result
    })

});
const deletePost = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.postId;
    const authorId = req.user?.id;

    const isAdmin = req.user?.role === "ADMIN";

    if (!postId) {
        throw new Error("Post is required")
    }

    const result = await postService.deletePost(postId as string, authorId as string, isAdmin)

    sendResponse(res, {
        success: true,
        statusCode: HttpStatus.OK,
        message: 'Post Delete successfully',
        data: result
    })

});


export const postController = {
    createPost, getAllPosts, getPostStats,
    getMyPost, getPostById, updatePost, deletePost
}