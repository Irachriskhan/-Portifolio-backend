import { Request, Response } from 'express';
import User from '../model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user registration
const register = async (req: Request, res: Response) => {
    try {
        //hashing password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            // role: req.body.role,
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: 'User successfully created',
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to create User! Try again',
        });
    }
};

// user login
const login = async (req: Request, res: Response) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({ email });

        // if user doesn't exist
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: 'User not found' });
        }

        // if user is exist then check password or compare the password
        const checkCorrectPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        );

        // if password is incorrect
        if (!checkCorrectPassword) {
            return res.status(401).json({
                success: false,
                message: 'incorrect email or password',
            });
        }

        const { password, role, ...rest } = user; // .__doc

        // create jwt token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET_KEY!,
            { expiresIn: '1d' },
        );

        // set token in the browser cookies and send the response to the client
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        })
            .status(200)
            .json({ token, data: { ...rest }, role });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to login' });
    }
};

export { register, login };
