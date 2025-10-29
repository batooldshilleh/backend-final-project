import express from 'express';
import metricRoutes from './routes/metricRoutes.js';
import { connectDB } from './infrastructure/database/mongoClient.js';

const app = express();
app.use(express.json());
app.use('/api/metrics', metricRoutes);

connectDB();

export default app;
