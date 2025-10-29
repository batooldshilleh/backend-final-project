export class Aggregator {
  constructor(metricRepository, options = {}) {
    this.repo = metricRepository;
    this.batchSize = options.batchSize || 500;
    this.flushIntervalMs = options.flushIntervalMs || 1000; 
    this.batches = []; 
    this.timer = null;
    this.flushing = false;
    this.start();
    this.maxBuffer = options.maxBuffer || 50000;
  }

  add(metric) {
    this.batches.push(metric);

    if (this.batches.length > this.maxBuffer) {
      const dropCount = this.batches.length - this.maxBuffer;
      this.batches.splice(0, dropCount);
      console.warn(`Aggregator buffer overflow — dropped ${dropCount} items`);
    }

    if (this.batches.length >= this.batchSize) {
      this.flush().catch((err) => {
        console.error('Aggregator flush error:', err.message);
      });
    }
  }

  async flush() {
    if (this.flushing) return;
    if (this.batches.length === 0) return;
    this.flushing = true;

    const toFlush = this.batches;
    this.batches = [];

    try {
      await this.repo.saveBulk(toFlush);
    } catch (err) {
      console.error('Failed to flush metrics:', err.message);
      this.batches = toFlush.concat(this.batches);
    } finally {
      this.flushing = false;
    }
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.flush().catch((err) => {
        console.error('Periodic flush error:', err.message);
      });
    }, this.flushIntervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
