import Database from "../database";
import Metric from "../models/Metric";

class MetricController {
  store(req, res) {
    const { key } = req.params;
    const { value } = req.body;

    const metric = new Metric(key, value);

    Database.addMetric(metric);

    return res.json({});
  }

  index(req, res) {
    const { key } = req.params;

    const metrics = Database.listMetricsBy(key);

    const sum = Math.round(
      metrics.reduce((acc, metric) => acc + metric.value, 0)
    );

    return res.json({
      value: sum
    });
  }
}

export default new MetricController();
