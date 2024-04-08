import express, { Router } from 'express';
import { login, register } from '../controller/authorisation.controller';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
