import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

export const userRoutes = Router();

userRoutes.post('/login', UserController.login);
userRoutes.get('/overview', authMiddleware, UserController.getAccountOverview);
