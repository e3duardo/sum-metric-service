import { Router } from "express";

import MetricController from "./app/controllers/MetricController";

const routes = new Router();

routes.post("/metric/:key", MetricController.store);
routes.get("/metric/:key/sum", MetricController.index);

export default routes;
