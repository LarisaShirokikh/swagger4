
import {commentsCollection, postsCollection} from "../settings";
import {CommentType, Pagination, PostType} from "../types";



export const postDbRepository = {
    async getAllPosts(pageNumber: number, pageSize: number): Promise<PostType | undefined | null> {

        const postsCount = await postsCollection.count({})
        const pagesCount = Math.ceil(postsCount / pageSize)
        const posts: PostType[] | PostType = await postsCollection
            .find({}, {projection : {_id: 0 } })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        const result = {
            pagesCount: pagesCount,
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items: posts
        }
        // @ts-ignore
        return result
    },

    async createPost(newPost: {
        bloggerName: string;
        id: string;
        shortDescription: string;
        title: string;
        content: string;
        bloggerId: string
    }): Promise<PostType | undefined> {
        const result = await postsCollection
            .insertOne(newPost)
        return
    },

    async getPostById(postId: string
    ): Promise<PostType | null> {
        const post = await postsCollection
            .findOne({id: postId}, {projection: {_id: 0}})
        return post;
    },

    async updatePost(postId: string, title: string, shortDescription: string, content: string, bloggerId: string): Promise<boolean> {
        const result = await postsCollection.updateOne({id: postId}, {
            $set: {
                title,
                shortDescription,
                content,
                bloggerId
            }
        })
        return result.matchedCount === 1

    },

    async deletePost(postId: string): Promise<boolean> {

        const result = await postsCollection
            .deleteOne({id: postId})

        return result.deletedCount === 1


    },

    async isPost(postId: string) {

        const post: PostType | null = await postsCollection
            .findOne({id: postId}, {projection: {_id: 0}})
        return post;

        if (post) {
            return true;
        } else {
            return false;
        }
    },


    async findPostById(id: string) {
        return await postsCollection.findOne({id: id}, {projection: {_id: 0}})
    },


}