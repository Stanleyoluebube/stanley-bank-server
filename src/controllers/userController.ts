import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { pool } from '../config/db';

export const UserController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      const user = await UserService.createUser(email, password);
      res.status(201).json({ id: user.id, email });
    } catch (e: any) {
      // Postgres unique-violation safety net in case of race between the
      // SELECT above and the INSERT inside createUser().
      if (e?.code === '23505') {
        return res.status(409).json({ message: 'Email already registered' });
      }
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

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
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: 'User not found in request' });
      const balance = await UserService.getBalance(userId);
      const transactions = await UserService.getTransactions(userId);
      res.json({ balance, transactions });
    } catch (e) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
