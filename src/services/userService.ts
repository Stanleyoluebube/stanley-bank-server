import { pool } from '../config/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const UserService = {
  async createUser(email: string, pass: string) {
    const hashedPass = await bcrypt.hash(pass, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPass]
    );
    return result.rows[0];
  },

  async authenticateUser(email: string, pass: string) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(pass, user.password)) {
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
      return { token, user: { id: user.id, email: user.email } };
    }
    return null;
  },

  async getBalance(userId: number) {
    const result = await pool.query('SELECT balance FROM accounts WHERE user_id = $1', [userId]);
    return result.rows[0]?.balance || 0;
  },

  async getTransactions(userId: number) {
    const result = await pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    return result.rows;
  }
};
