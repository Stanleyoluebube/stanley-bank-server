"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.adminRoutes = (0, express_1.Router)();
// Middleware should check if user is actually an admin in a real production scenario
exports.adminRoutes.get('/stats', authMiddleware_1.authMiddleware, adminController_1.AdminController.getDashboardStats);
exports.adminRoutes.get('/stream', authMiddleware_1.authMiddleware, adminController_1.AdminController.getLiveStream);
exports.adminRoutes.post('/approve/:id', authMiddleware_1.authMiddleware, adminController_1.AdminController.approvePayment);
exports.adminRoutes.post('/decline/:id', authMiddleware_1.authMiddleware, adminController_1.AdminController.declinePayment);
//# sourceMappingURL=adminRoutes.js.map