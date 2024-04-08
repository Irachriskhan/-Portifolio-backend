import messageController from '../controller/message.controller';
import express, { Router } from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken';

const router: Router = express.Router();

router
    .route('/')
    .post(verifyUser, messageController.sendMessage)
    .get(verifyAdmin, messageController.readAllMessage)
    .delete(verifyAdmin, messageController.deleteAllMessage);
router
    .route('/:id')
    .get(verifyAdmin, messageController.readMessage)
    .delete(verifyAdmin, messageController.deleteMessage);

router.route('/reply/:id').post(verifyAdmin, messageController.replyMessage);

export default router;
