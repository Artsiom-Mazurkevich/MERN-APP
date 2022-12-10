import {Post, IPost} from '../models/PostSchema';
import {Request, Response} from "express";
import {uploadController} from "./uploadController";
import {log} from "util";


class PostController_ {
    async createPost(req: Request<{}, {}, IPost>, res: Response) {
        try {
            const {title, text, tags} = req.body
            // @ts-ignore
            const post = new Post({title, text, tags, author: req.user.id})
            await post.save()
            res.json({message: 'success'})
        } catch (e) {
            console.log(e)
        }
    }

    async updatePost(req: Request<{ id: string }, {}, IPost>, res: Response) {
        try {
            const postId = req.params.id;
            const {title, text, tags, imageURL} = req.body
            Post.findByIdAndUpdate({_id: postId}, {title, text, tags, imageURL}, {}, (err, doc) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({message: "Failed to update article"})
                }
                if (!doc) {
                    return res.status(404).json({message: "Article not found"})
                }
                return res.json({message: "Article updated successfully"})
            })
        } catch (e) {
            console.log(e)
        }
    }

    async deletePost(req: Request<{ id: string }, {}, {}>, res: Response) {
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
        } catch (e) {
            console.log(e)
        }
    }

    async getOnePost(req: Request<{ id: string }, {}, {}>, res: Response) {
        try {
            const postId = req.params.id;
            Post.findByIdAndUpdate({_id: postId},
                {$inc: {viewsCount: 1}},
                {returnDocument: 'after'},
                (err, doc) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({message: 'Failed to return article'})
                    }
                    if (!doc) {
                        return res.status(404).json({message: 'Article not found'})
                    }
                    return res.json({doc})
                })
        } catch (e) {
            console.log(e)
        }
    }
    async getAllPosts (req: Request, res: Response) {
        const posts = await Post.find();
        return res.json(posts)
    }
}

export const postController = new PostController_()
