import { constants } from "node:buffer";
import { CommentStatus, PostStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload, IPostQuery, IUpdatePostPayload } from "./post.interface"

const createPostIntoDB = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    })
    return result;
};
const getAllPostsFromDB = async (query: IPostQuery) => {

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
    postId: string, authorId: string,
    payload: IUpdatePostPayload, isAdmin: boolean
) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId
        }
    })

    if (!isAdmin && post.authorId !== authorId) {
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
};
const deletePost = async (postId: string, authorId: string, isAdmin: boolean) => {
    const post = await prisma.post.findFirstOrThrow({
        where: {
            id: postId
        }
    });

    if (!isAdmin && post.authorId !== authorId) {
        throw new Error("You are not of the owner of this post!")
    }

    await prisma.post.delete({
        where: {
            id: postId
        }
    })
    return null;
};
const getPostStats = async () => {
    const transactionResult = await prisma.$transaction(
        async (tx) => {

            const [
                totalPosts,
                totalPublishedPosts,
                totalDraftPosts,
                totalArchivedPosts,
                totalComments,
                totalApprovedComments,
                totalRejectedComments,
                totalPostViewsAgregate
            ] = await Promise.all([
                await tx.post.count(),

                await tx.post.count({
                    where: {
                        status: PostStatus.PUBLISHED
                    }
                }),

                await tx.post.count({
                    where: {
                        status: PostStatus.DRAFT
                    }
                }),

                await tx.post.count({
                    where: {
                        status: PostStatus.ACHIVED
                    }
                }),

                await tx.comment.count(),

                await tx.comment.count({
                    where: {
                        status: CommentStatus.APPROVED
                    }
                }),

                await tx.comment.count({
                    where: {
                        status: CommentStatus.REJECT
                    }
                }),

                await tx.post.aggregate({
                    _sum: {
                        views: true
                    }
                }),

            ]);
            return {
                totalPosts,
                totalPublishedPosts,
                totalDraftPosts,
                totalArchivedPosts,
                totalComments,
                totalApprovedComments,
                totalRejectedComments,
                totalPostViews: totalPostViewsAgregate._sum.views
            }
        }
    )
    return transactionResult;
}

export const postService = {
    createPostIntoDB, getAllPostsFromDB, getPostByIdIntoDB,
    getMyPost, updatePostIntoDB, deletePost, getPostStats
}