import request from "supertest";
import random from "../util/random";
import dateTwoHourBefore from "../util/date";
import Database from "../../src/app/database";
import app from "../../src/app";

describe("Metric", () => {
  beforeEach(async () => {
    await Database.clean();
  });

  it("should be able to add metric", async () => {
    const randomValue = random();

    const response = await request(app)
      .post("/metric/key")
      .send({ value: randomValue });

    expect(response.status).toEqual(200);
  });

  it("should be able return a sum of all metrics", async () => {
    let sum = 0;

    for (let index = 0; index < 5; index++) {
      const randomValue = random();
      await request(app)
        .post("/metric/key")
        .send({ value: randomValue });

      sum += randomValue;
    }

    const response = await request(app)
      .get("/metric/key/sum")
      .send();

    expect(response.body).toEqual({ value: sum });
  });

  it("should be round all values", async () => {
    await request(app)
      .post("/metric/key")
      .send({ value: 2.2 });
    await request(app)
      .post("/metric/key")
      .send({ value: 6.2 });
    await request(app)
      .post("/metric/key")
      .send({ value: 8.7 });

    const response = await request(app)
      .get("/metric/key/sum")
      .send();

    expect(response.body).toEqual({ value: 17 });
  });

  it("should a key not be affected by differents keys", async () => {
    await request(app)
      .post("/metric/key1")
      .send({ value: 10 });
    await request(app)
      .post("/metric/key2")
      .send({ value: 20 });
    await request(app)
      .post("/metric/key3")
      .send({ value: 30 });

    const response = await request(app)
      .get("/metric/key/sum")
      .send();

    expect(response.body).toEqual({ value: 0 });
  });

  it("should not sum metrics before one hour", async () => {
    global.Date.now = jest.fn(() => dateTwoHourBefore());

    await request(app)
      .post("/metric/key")
      .send({ value: 4 });
    await request(app)
      .post("/metric/key")
      .send({ value: 6 });

    global.Date.now = jest.fn(() => new Date());

    await request(app)
      .post("/metric/key")
      .send({ value: 13 });

    const response = await request(app)
      .get("/metric/key/sum")
      .send();

    expect(response.body).toEqual({ value: 13 });
  });
});
