"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const db_1 = require("../config/db");
exports.AdminService = {
    async getGlobalStats() {
        const totalUsers = await db_1.pool.query('SELECT COUNT(*) FROM users');
        const totalDeposits = await db_1.pool.query('SELECT SUM(balance) FROM accounts');
        const activeLoans = await db_1.pool.query('SELECT COUNT(*) FROM loans WHERE status = $1', ['active']);
        return {
            totalUsers: totalUsers.rows[0].count,
            totalDeposits: totalDeposits.rows[0].sum,
            activeLoans: activeLoans.rows[0].count,
            uptime: '99.98%'
        };
    },
    async getTransactionStream() {
        const result = await db_1.pool.query('SELECT t.*, u.email FROM transactions t JOIN users u ON t.user_id = u.id ORDER BY created_at DESC LIMIT 50');
        return result.rows;
    },
    async approvePayment(transactionId) {
        const result = await db_1.pool.query('UPDATE transactions SET status = $1 WHERE id = $2 AND status = $3 RETURNING *', ['approved', transactionId, 'pending']);
        if (result.rowCount === 0)
            throw new Error('Transaction not found or already processed');
        const tx = result.rows[0];
        // Update user balance if it was a deposit or similar
        await db_1.pool.query('UPDATE accounts SET balance = balance + $1 WHERE user_id = $2', [tx.amount, tx.user_id]);
        return tx;
    },
    async declinePayment(transactionId) {
        const result = await db_1.pool.query('UPDATE transactions SET status = $1 WHERE id = $2 AND status = $3 RETURNING *', ['declined', transactionId, 'pending']);
        if (result.rowCount === 0)
            throw new Error('Transaction not found or already processed');
        return result.rows[0];
    }
};
//# sourceMappingURL=adminService.js.map