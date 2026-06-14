import { Request, Response } from 'express';
import { AdminService } from '../services/adminService';

export const AdminController = {
  async getDashboardStats(req: Request, res: Response) {
    try {
      const stats = await AdminService.getGlobalStats();
      res.json(stats);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getLiveStream(req: Request, res: Response) {
    try {
      const stream = await AdminService.getTransactionStream();
      res.json(stream);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async approvePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await AdminService.approvePayment(id);
      res.json({ message: 'Payment approved successfully', transaction });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  },

  async declinePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await AdminService.declinePayment(id);
      res.json({ message: 'Payment declined successfully', transaction });
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
};
