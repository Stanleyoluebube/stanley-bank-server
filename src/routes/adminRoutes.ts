import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authMiddleware } from '../middleware/authMiddleware';

export const adminRoutes = Router();

// Middleware should check if user is actually an admin in a real production scenario
adminRoutes.get('/stats', authMiddleware, AdminController.getDashboardStats);
adminRoutes.get('/stream', authMiddleware, AdminController.getLiveStream);
adminRoutes.post('/approve/:id', authMiddleware, AdminController.approvePayment);
adminRoutes.post('/decline/:id', authMiddleware, AdminController.declinePayment);
