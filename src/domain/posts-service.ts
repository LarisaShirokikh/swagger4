import {ObjectId} from "mongodb";
import {PostsType} from "../types";
import {PostsRepository} from "../repositories/posts-repository";
import {BloggersRepository} from "../repositories/bloggers-repository";
import {injectable} from "inversify";


@injectable()
export class PostsService {
    postsRepository: PostsRepository
    bloggersRepository: BloggersRepository

    constructor() {
        this.postsRepository = new PostsRepository()
        this.bloggersRepository = new BloggersRepository()
    }


    async getAllPosts(pageNumber: string = "1" || undefined || null, pageSize: string = "10" || undefined || null, userId: string): Promise<{}> {
        const postsDb = await this.postsRepository
            .getAllPosts(+pageNumber, +pageSize, userId)
        const posts = {...postsDb}
        return posts
    }
    async findBloggersPost(pageNumber: string = "1" || undefined || null, pageSize: string = "10" || undefined || null, bloggerId: string, userId: string): Promise<{}> {
        //@ts-ignore
        const postsDb = await this.postsRepository
            .findBloggersPost(+pageNumber,+pageSize, bloggerId, userId)
        const posts = {...postsDb}
        return posts
    }


    async findPosts(pageSize: number, pageNumber: number, userId: string) {
        return await this.postsRepository.findPosts(pageSize, pageNumber, userId)
    }

    async findPostById(postId: string, userId: string): Promise<PostsType | null> {
        return await this.postsRepository.findPostById(postId, userId)
    }

    async createPost(title: string, shortDescription: string, content: string, bloggerId: string): Promise<PostsType | undefined> {
        const blogger = await this.bloggersRepository.getBloggerById(bloggerId)

        if (blogger) {
            const newPost = {
                id: (new ObjectId()).toString(),
                title,
                shortDescription,
                content,
                bloggerId,
                bloggerName: blogger.name,
                addedAt: new Date,
                extendedLikesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: "None",
                    newestLikes: []
                }
            }

            // @ts-ignore
            const createdPost = await this.postsRepository.createPost(newPost)
            return createdPost
        }
    }

    async updatePost(id: string, title: string, shortDescription: string, content: string, bloggerId: string) {
        return await this.postsRepository.updatePost(id, title, shortDescription, content, bloggerId)
    }

    async deletePosts(id: string) {
        return await this.postsRepository.deletePosts(id)
    }

    async getCount() {
        return await this.postsRepository.getCount()
    }

    async getPostById(postId: string): Promise<PostsType | null> {
        return this.postsRepository.getPostById(postId)
    }

    async updateLikeStatus(user: any, postId: string, likeStatus: "None" | "Like" | "Dislike"): Promise<boolean | undefined> {
        const addedLikeStatusAt = new Date()
       const updateLike = await this.postsRepository.updateLikeStatus(user, postId, likeStatus, addedLikeStatusAt)
        console.log(updateLike)
return updateLike
    }
}


