import mongoose from 'mongoose';

const metricSchema = new mongoose.Schema({
  serverId: { type: String, required: true },
  cpu: { type: Number, required: true },
  memory: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Metric = mongoose.model('Metric', metricSchema);
