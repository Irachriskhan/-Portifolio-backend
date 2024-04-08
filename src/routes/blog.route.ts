import express, { Router } from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken';
import blogController from '../controller/blog.controller';

const router: Router = express.Router();

router
    .route('/:id')
    .get(verifyAdmin, blogController.getSingleBlog)
    .delete(verifyAdmin, blogController.deleteBlog)
    .patch(verifyAdmin, blogController.updateBlog);

router
    .route('/')
    .post(verifyAdmin, blogController.postBlog)
    .get(verifyAdmin, blogController.getAllBlog);

router.route('/user/:id').get(verifyUser, blogController.getSingleBlog);
router.route('/user').get(verifyUser, blogController.getAllBlog);

export default router;
