import {Post, IPost} from '../models/PostSchema';
import {Request, Response} from "express";




class PostController_ {
    async createPost (req: Request<{}, {}, IPost>, res: Response) {
        try {
            const {title, text, tags, imageURL} = req.body
            // @ts-ignore
            const post = new Post({title, text, tags, imageURL, author: req.user.id})
            await post.save()
            res.json({message: 'success'})
        }
        catch (e) {
            console.log(e)
        }
    }
    async updatePost (req:Request, res: Response) {
        try {

        }
        catch (e) {

        }
    }
    async deletePost (req:Request, res: Response) {
        try {

        }
        catch (e) {

        }
    }
}

export const postController = new PostController_()
