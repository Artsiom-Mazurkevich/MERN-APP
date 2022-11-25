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
    async updatePost (req: Request<{id: string}, {}, IPost>, res: Response) {
        try {
            const postId = req.params.id;
            const {title, text, tags, imageURL} = req.body
            await Post.findByIdAndUpdate({_id: postId}, {title, text, tags, imageURL}, {}, (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({message: "Failed to update article"})
                }
                if (!doc) {
                    return res.status(404).json({message: "Article not found"})
                }
                return res.json({message: "Article updated successfully"})
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    async deletePost (req:Request<{id: string}, {}, {}>, res: Response) {
        try {
            const postId = req.params.id;
            await Post.findOneAndDelete({_id: postId}, {}, (err, doc) => {
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
