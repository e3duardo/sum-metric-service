class MetricController {
  store(req, res) {
    return res.json({ value: 400 });
  }

  index(req, res) {
    return res.json({});
  }
}

export default new MetricController();
