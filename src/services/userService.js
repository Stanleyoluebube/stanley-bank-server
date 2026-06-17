"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.UserService = {
    async createUser(email, pass) {
        const hashedPass = await bcrypt_1.default.hash(pass, 10);
        const result = await db_1.pool.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id', [email, hashedPass]);
        return result.rows[0];
    },
    async authenticateUser(email, pass) {
        const result = await db_1.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (user && await bcrypt_1.default.compare(pass, user.password)) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return { token, user: { id: user.id, email: user.email } };
        }
        return null;
    },
    async getBalance(userId) {
        const result = await db_1.pool.query('SELECT balance FROM accounts WHERE user_id = $1', [userId]);
        return result.rows[0]?.balance || 0;
    },
    async getTransactions(userId) {
        const result = await db_1.pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return result.rows;
    }
};
//# sourceMappingURL=userService.js.map