import { Request, Response } from 'express';
import User from '../model/User';
import { userValidator } from '../utils/validators/validators';

// create new User
const createUser = async (req: Request, res: Response) => {
    const { error } = userValidator.validate(req.body);

    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }

    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();

        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create a user. Try again!',
        });
    }
};

// update User
const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'User successfully updated',
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
        });
    }
};

// delete User
const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'failed to delete the user',
        });
    }
};

// getSingle User
const getSingleUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: user,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: 'User not found' });
    }
};

// getAll User
const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await User.find({});

        res.status(200).json({
            success: true,
            message: 'Successful',
            data: users,
        });
    } catch (err) {
        res.status(404).json({ success: false, message: 'No user found' });
    }
};

export { deleteUser, getSingleUser, getAllUser, updateUser, createUser };
