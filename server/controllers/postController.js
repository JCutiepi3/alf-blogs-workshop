const Post = require('../models/postModel')
const deleteFile = require('../utils/deleteFile')

//CREATE
const createPost = async (req, res) => {
    if (!req.body) {
        res.status(400)
        throw new Error('No request body`')
    }

    const { title, author, content, cover_photo } = req.body

    // Optionally check if req.file exists
    const path = req.file?.path ?? null;

    try {
        const post = new Post({
            title,
            author,
            content,
            cover_photo: path
        })

        const newPost = await post.save()

        if (newPost) {
            res.status(201).json(newPost)
        }
    } catch (err) {
        console.log(err)
        res.status(422).json(err)
    }
}
//READ

// @desc    Get all Posts
// @route   GET /posts  
// access   Public
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()

        res.json(posts)
    } catch (err) {
        console.log(err)
    }

}

const showPost = async (req, res) => {
    try {
        const { id } = req.params

        const post = await Post.findById(id)

        if (!post) {
          // If post is null, throw an error
            throw new Error('Post not found')
        }

        res.status(200).json(post)
    } catch (error) {
        res.status(404).json({ error: 'Post not found' })
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params

    if (!req.body || !Object.keys(req.body).length) {
        res.status(400).json({ error: 'No request body' })
    }

    const { title, author, content } = req.body

    
    const path = req.file?.path ?? null;

    try {
        //finds the post
        const originalPost = await Post.findById(id);

        // no post return
        if (!originalPost) {
          
            return res.status(404).json({ error: 'Original post not found' });
        }
        //delete's previous photo
        if (originalPost.cover_photo && path) {
            console.log(originalPost)
            deleteFile(originalPost.cover_photo)
        }
        //update the contents
        originalPost.title = title;
        originalPost.author = author;
        originalPost.content = content;
        originalPost.cover_photo = path;

        const updatedPost = await originalPost.save();
        //return
        res.status(200).json(updatedPost)
    } catch (error) {
        console.log(error)
        res.status(422).json(error)
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params

    const post = await Post.findByIdAndDelete(id)

    if (!post) {
        return res.status(404).json({ message: 'post not found' })
    }

    res.status(201).json({ message: 'Successfully deleted post!' })
}

module.exports = {
    getAllPosts,
    createPost,
    showPost,
    updatePost,
    deletePost,
    
}




