import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

const createPostIntoDB = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })
    return result;
}
const getAllPostsFromDB = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })
    return posts;
}
const getPostByIdIntoDB = async (postId: string) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId
        }
    })
    const UpdatedPost = prisma.post.update({
        where: {
            id: postId
        },
        data: {
            views: {
                increment: 1
            },
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    })
    return UpdatedPost;
}

export const postService = {
    createPostIntoDB, getAllPostsFromDB, getPostByIdIntoDB
}