"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const adminService_1 = require("../services/adminService");
exports.AdminController = {
    async getDashboardStats(req, res) {
        try {
            const stats = await adminService_1.AdminService.getGlobalStats();
            res.json(stats);
        }
        catch (e) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async getLiveStream(req, res) {
        try {
            const stream = await adminService_1.AdminService.getTransactionStream();
            res.json(stream);
        }
        catch (e) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async approvePayment(req, res) {
        try {
            const { id } = req.params;
            const transactionId = typeof id === 'string' ? id : String(id);
            const transaction = await adminService_1.AdminService.approvePayment(transactionId);
            res.json({ message: 'Payment approved successfully', transaction });
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    },
    async declinePayment(req, res) {
        try {
            const { id } = req.params;
            const transactionId = typeof id === 'string' ? id : String(id);
            const transaction = await adminService_1.AdminService.declinePayment(transactionId);
            res.json({ message: 'Payment declined successfully', transaction });
        }
        catch (e) {
            res.status(400).json({ error: e.message });
        }
    }
};
//# sourceMappingURL=adminController.js.map