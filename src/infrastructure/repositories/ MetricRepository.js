import { Metric } from '../../domain/Metric.js';

export class MetricRepository {
  async save(metricData) {
    const metric = new Metric(metricData);
    return await metric.save();
  }

  async saveBulk(metricsArray) {
    if (!Array.isArray(metricsArray) || metricsArray.length === 0) return [];
    return await Metric.insertMany(metricsArray, { ordered: false }); 
  }

  async getRecent(limit = 10) {
    return await Metric.find().sort({ timestamp: -1 }).limit(limit);
  }
}
