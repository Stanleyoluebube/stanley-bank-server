"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userService_1 = require("../services/userService");
exports.UserController = {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const auth = await userService_1.UserService.authenticateUser(email, password);
            if (!auth)
                return res.status(401).json({ message: 'Invalid credentials' });
            res.json(auth);
        }
        catch (e) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async getAccountOverview(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId)
                return res.status(401).json({ message: 'User not found in request' });
            const balance = await userService_1.UserService.getBalance(userId);
            const transactions = await userService_1.UserService.getTransactions(userId);
            res.json({ balance, transactions });
        }
        catch (e) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
//# sourceMappingURL=userController.js.map