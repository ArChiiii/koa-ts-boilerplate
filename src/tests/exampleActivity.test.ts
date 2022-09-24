process.env.NODE_ENV = "test";

import ChaiHttp = require("chai-http");
import chai from "chai";
import { expect } from "chai";
chai.use(ChaiHttp);

const server = require("../../dist/index");
// import server from "../../dist/index"
import knex from "../db/connection";
import { IRequest } from "../model/request";

describe("routes : example_activity", () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe("GET /api/example_activity", () => {
    it("should return all example_activity", (done) => {
      chai
        .request(server)
        .get("/api/example_activity")
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).equal(200);
          expect(res.type).equal("application/json");
          expect(res.body.success).equal(true);
          expect(res.body.data.length).equal(3);
          expect(res.body.data[0]).include.keys("name");

          done();
        });
    });
  });

  describe("POST /api/example_activity", () => {
    it("should return the example_activity that was added", (done) => {
      chai
        .request(server)
        .post("/api/example_activity")
        .send(<IRequest>{
          name: "",
        })
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.status).equal(201);
          expect(res.type).equal("application/json");
          expect(res.body.success).equal(true);

          expect(res.body.data).include.keys("name");

          done();
        });
    });

    it("should return error", (done) => {
      chai
        .request(server)
        .post("/api/example_activity")
        .send({
          photofnameghilename: "name.jpg",
        })
        .end((err, res) => {
          expect(res.body.message).to.exist;
          expect(res.status).equal(400);
          expect(res.body.success).equal(false);
          done();
        });
    });
  });
});
