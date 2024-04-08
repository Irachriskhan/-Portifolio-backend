import BlogModel from '../model/Blog';
import sendNotificationEmails from '../utils/sendEmail.notification';
import { Request, Response } from 'express';
import { blogValidator } from '../utils/validators/validators';

class blogController {
    public static async postBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const { title, photo, introduction, description } = req.body;

        try {
            const { error } = blogValidator.validate(req.body);

            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }

            const blog = await BlogModel.create({
                title,
                photo,
                introduction,
                description,
            });

            const subscribers = [
                'irachriskhan@gmail.com',
                'christo.irakoze@gmail.com',
            ];

            const password: string = 'jn7jnAPss4f63QBp6D';
            const sender: string = 'maddison53@ethereal.email';

            if (blog) {
                sendNotificationEmails(
                    sender,
                    password,
                    title,
                    introduction,
                    subscribers,
                );

                res.status(201).json({ success: true, message: blog });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Blog not created',
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error creating blog',
            });
        }
    }

    public static async getSingleBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const blogid = req.params.id;

        try {
            const blog = await BlogModel.findById(blogid);

            if (blog) {
                res.status(200).json({
                    success: true,
                    action: 'Blog found',
                    message: blog,
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Invalid ID',
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Couldn't find blog",
            });
        }
    }

    public static async getAllBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const blogs = await BlogModel.find({});

            if (blogs) {
                res.status(200).json({ success: true, message: blogs });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Invalid request',
                });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Access denied' });
        }
    }

    public static async deleteBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const blogId = req.params.id;

        try {
            const blog = await BlogModel.findByIdAndDelete(blogId);
            if (blog) {
                res.status(200).json({ success: true, message: blog });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'No blog found to be deleted',
                });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Access denied' });
        }
    }

    public static async deleteAllBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const blog = await BlogModel.deleteMany({});

            if (blog) {
                res.status(200).json({ success: true, message: blog });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'No blog found to be deleted',
                });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Access denied' });
        }
    }

    public static async updateBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const blogId = req.params.id;
        try {
            const blog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
                new: true,
            });

            if (blog) {
                res.status(201).json({ success: blog });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No blog found to be updated',
                });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Access denied' });
        }
    }

    public static async likeBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {}

    public static async dislikeBlog(
        req: Request,
        res: Response,
    ): Promise<Response | void> {}
}

export default blogController;
