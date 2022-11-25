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
            const postId = req.params.id;
            Post.findOneAndDelete({_id: postId}, {}, (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({message: "Failed to delete article"})
                }
                if (!doc) {
                    return res.status(404).json({message: "Article not found"})
                }
                return res.json({message: "Article deleted successfully"})
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export const postController = new PostController_()
