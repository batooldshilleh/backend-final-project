export class HandleMetricUseCase {
  constructor(metricRepository, aggregator = null) {
    this.metricRepository = metricRepository;
    this.aggregator = aggregator; 
  }

  async execute(metricData) {
    if (!metricData.serverId || metricData.cpu == null || metricData.memory == null) {
      throw new Error('Invalid metric data');
    }


    if (this.aggregator) {
      this.aggregator.add({
        ...metricData,
        timestamp: metricData.timestamp ? new Date(metricData.timestamp) : new Date(),
      });

      return { acknowledged: true, buffered: true };
    }

    const saved = await this.metricRepository.save({
      ...metricData,
      timestamp: metricData.timestamp ? new Date(metricData.timestamp) : new Date(),
    });

    return saved;
  }
}
