import CommentModel from 'model/Comment';
import { Request, Response } from 'express';
import { commentValidator } from '../utils/validators/validators';
// import validationMiddleware from '../middleware/middleware.validators';

class CommentController {
    public static async addComment(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const { error } = commentValidator.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }
    }

    public static async deleteComment(
        req: Request,
        res: Response,
    ): Promise<Response | void> {}

    public static async deleteAllComment(
        req: Request,
        res: Response,
    ): Promise<Response | void> {}

    public static async readAllComment(
        req: Request,
        res: Response,
    ): Promise<Response | void> {}
}

export default CommentController;
