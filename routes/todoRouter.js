import express from 'express';
import {addPost,updatePost,deletePost,getPosts,getSinglePost} from '../controllers/todoController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router=express.Router();

router.post('/addpost',AuthMiddleware,addPost)
router.patch('/updatepost/:id',AuthMiddleware,updatePost)
router.delete('/deletepost/:id',AuthMiddleware,deletePost)
router.get('/getposts',AuthMiddleware,getPosts)
router.get('/getsinglepost/:id',getSinglePost) 


export default router;