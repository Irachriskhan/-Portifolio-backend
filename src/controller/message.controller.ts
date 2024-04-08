import MessageModel from '../model/Message';
import { messageValidator } from '../utils/validators/validators';
import { Request, Response } from 'express';

class messageController {
    public static async sendMessage(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const { error } = messageValidator.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { sender, email, body } = req.body;
        const message = new MessageModel({ sender, email, body });
        try {
            if (message) {
                return res.status(201).json({
                    status: 'Success',
                    message: message,
                });
            } else {
                return res.status(404).json({
                    message: 'Message not sent',
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                message: error.message,
            });
        }
    }

    public static async replyMessage(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const { sender, email, body, replyTo } = req.body;
            const message = new MessageModel({ sender, email, body, replyTo });

            if (message) {
                if (replyTo) {
                    return res.status(201).json({
                        status: 'Success',
                        message: message,
                    });
                } else {
                    return res.status(404).json({
                        status: 'failed',
                        message: 'Invalid reply',
                    });
                }
            } else {
                return res.status(404).json({
                    message: 'Message not sent',
                });
            }
            // const reply = await MessageModel.create({
            //     sender,
            //     email,
            //     body,
            //     replyTo,
            // });
        } catch (error: any) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    public static async readMessage(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const messageId = req.params.id;

        try {
            const message = await MessageModel.findById(messageId);

            if (message) {
                res.status(201).json({ status: 'success', message: message });
            } else {
                res.status(404).json({
                    status: 'failed',
                    message: 'No message found',
                });
            }
        } catch (error: any) {
            res.status(500).json({
                message: 'Access denied',
                error: error.message,
            });
        }
    }

    public static async readAllMessage(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const messages = await MessageModel.find({});

            if (messages) {
                res.status(201).json({ status: 'success', messages: messages });
            } else {
                res.status(404).json({
                    status: 'success',
                    message: 'No messages found',
                });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public static async deleteMessage(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        const messageId = req.params.id;
        try {
            const message = await MessageModel.findByIdAndDelete(messageId);
            if (message) {
                res.status(201).json({
                    status: 'success',
                    action: 'Message deleted',
                    message: message,
                });
            } else {
                res.status(404).json({
                    status: 'failed',
                    message: 'No message found',
                });
            }
        } catch (error) {
            res.status(500).json({
                status: 'failed',
                message: 'Access denied',
            });
        }
    }

    public static async deleteAllMessage(
        req: Request,
        res: Response,
    ): Promise<Response | void> {
        try {
            const allMessage = await MessageModel.deleteMany({});
            if (allMessage) {
                res.status(201).json({
                    status: 'Success',
                    action: 'All messages are deleted',
                    message: allMessage,
                });
            } else {
                res.status(404).json({
                    status: 'failed',
                    message: 'No message deleted',
                });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
        res.send('All message will be deleted!');
    }
}

export default messageController;
