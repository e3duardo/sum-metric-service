class Database {
  constructor() {
    this.metrics = [];
  }

  clean() {
    this.metrics = [];
  }
  addMetric(metric) {
    this._removeOldDate();
    this.metrics.push(metric);
  }
  listMetricsBy(key) {
    this._removeOldDate();
    return this.metrics.filter(m => m.is(key));
  }

  _removeOldDate() {
    this.metrics = this.metrics.filter(m => m.isFromLastHour());
  }
}

export default new Database();
