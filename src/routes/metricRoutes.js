import express from 'express';
import { MetricController } from '../interfaces/controllers/MetricController.js';

const router = express.Router();

router.post('/', MetricController.postMetric);
router.get('/', MetricController.getRecent);

export default router;
