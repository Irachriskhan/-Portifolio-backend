import express, { Router } from 'express';
import {
    deleteUser,
    getAllUser,
    getSingleUser,
    updateUser,
} from '../controller/user.controller';
const router: Router = express.Router();
import { verifyAdmin, verifyUser } from '../utils/verifyToken';

router.put('/:id', verifyUser, updateUser);
router.delete('/:id', verifyAdmin, deleteUser);
router.get('/:id', verifyUser, getSingleUser);
router.get('/', verifyAdmin, getAllUser);

export default router;
