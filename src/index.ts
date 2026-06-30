import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { userRoutes } from './routes/userRoutes';
import { adminRoutes } from './routes/adminRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * ✅ PRODUCTION CORS CONFIG
 * Frontend: https://app.stanleybank.site
 */
app.use(cors({
  origin: "https://app.stanleybank.site",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Stanley Bank Server running on port ${PORT}`);
});