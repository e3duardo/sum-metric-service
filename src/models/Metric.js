class Metric {
  constructor(key, value) {
    this.key = key;
    this.value = Math.round(value);
    this.createdAt = new Date();
  }

  is(key) {
    return this.key === key;
  }

  isFromLastHour() {
    var difference = new Date() - this.createdAt;

    return Math.round(difference / (60 * 1000)) <= 60;
  }
}

export default Metric;
