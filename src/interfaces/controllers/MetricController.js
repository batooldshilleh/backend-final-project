import { MetricRepository } from '../../infrastructure/repositories/ MetricRepository.js';
import { HandleMetricUseCase } from '../../usecases/HandleMetricUseCase.js';
import { Aggregator } from '../../infrastructure/aggregation/Aggregator.js';

const repo = new MetricRepository();

let aggregatorInstance = null;
if (process.env.MODE === 'stateful') {
  const batchSize = parseInt(process.env.AGG_BATCH_SIZE || '500', 10);
  const flushIntervalMs = parseInt(process.env.AGG_FLUSH_INTERVAL_MS || '1000', 10);
  aggregatorInstance = new Aggregator(repo, { batchSize, flushIntervalMs });
}

const handleMetricUseCase = new HandleMetricUseCase(repo, aggregatorInstance);

export const MetricController = {
  async postMetric(req, res) {
    try {
      const metricData = req.body;
      const saved = await handleMetricUseCase.execute(metricData);
      if (process.env.MODE === 'stateful') {
        return res.status(202).json({ message: 'Metric buffered', data: saved });
      }
      return res.status(201).json({ message: 'Metric received', data: saved });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getRecent(req, res) {
    try {
      const data = await repo.getRecent(20);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
