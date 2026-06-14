import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export const UserController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const auth = await UserService.authenticateUser(email, password);
      if (!auth) return res.status(401).json({ message: 'Invalid credentials' });
      res.json(auth);
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getAccountOverview(req: Request, res: Response) {
    try {
      const userId = req.user.id; // Set by auth middleware
      const balance = await UserService.getBalance(userId);
      const transactions = await UserService.getTransactions(userId);
      res.json({ balance, transactions });
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
