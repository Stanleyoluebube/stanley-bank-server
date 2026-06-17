"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
exports.userRoutes = (0, express_1.Router)();
exports.userRoutes.post('/login', userController_1.UserController.login);
exports.userRoutes.get('/overview', authMiddleware_1.authMiddleware, userController_1.UserController.getAccountOverview);
//# sourceMappingURL=userRoutes.js.map