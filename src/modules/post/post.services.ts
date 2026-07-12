import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface"

const createPostIntoDB = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })
    return result;
};
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
};
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
};
const getMyPost = async (authorId: string) => {
    const result = prisma.post.findMany({
        where: {
            authorId: authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comments: true,
            author: {
                omit: {
                    password: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })
    return result;
};
const updatePostIntoDB = async (
    postId: string, athorId: string,
    payload: IUpdatePostPayload, isAdmin: boolean
) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && post.authorId !== athorId) {
        throw new Error("You are not of the owner of this post!")
    }

    const result = await prisma.post.update({
        where: {
            id: postId
        },
        data: payload,
        include: {
            comments: true,
            author: {
                omit: {
                    password: true
                }
            },
            _count: {
                select: {
                    comments: true
                }
            }
        }
    })
    return result;
}

export const postService = {
    createPostIntoDB, getAllPostsFromDB, getPostByIdIntoDB,
    getMyPost
}