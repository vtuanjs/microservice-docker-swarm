process.env.NODE_ENV = "test";
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../fake-server")
const products = require("../products.json");
let productIds = []

describe("ProductManager", () => {
  describe("create", () => {
    it('[OK] --> Product "Iphone 11" information', done => {
      request(app)
        .post("/api/v1/products")
        .send(products[0])
        .then(res => {
          const product = res.body
          expect(res.statusCode).to.equals(200);
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(error => done(error));
    });

    it('[OK] --> Product "Redmi 5" information', done => {
      request(app)
        .post("/api/v1/products")
        .send(products[1])
        .then(res => {
          const product = res.body
          expect(res.statusCode).to.equals(200);
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(error => done(error));
    });

    it('[OK] --> Product "Samsung A2" information', done => {
      request(app)
        .post("/api/v1/products")
        .send(products[2])
        .then(res => {
          const product = res.body
          expect(res.statusCode).to.equals(200);
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(error => done(error));
    });

    it('[OK] --> Product "Xiaomi 8" information', done => {
      request(app)
        .post("/api/v1/products")
        .send(products[3])
        .then(res => {
          const product = res.body
          expect(res.statusCode).to.equals(200);
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(error => done(error));
    });
  });

  describe("list", () => {
    it('[OK] --> List product information', done => {
      request(app)
        .get("/api/v1/products?fields=name,price,createdAt")
        .then(res => {
          const products = res.body
          expect(res.statusCode).to.equals(200);
          expect(products.length).to.greaterThan(0)
          expect(products[0]).to.haveOwnProperty("_id");
          expect(products[0])
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(products[0])
            .to.not.haveOwnProperty("updatedAt")
          productIds = products.map(product => product._id)
          done();
        })
        .catch(error => done(error));
    });
  });

  describe("update", () => {
    it('[OK] --> Update product information', done => {
      request(app)
        .put("/api/v1/products/" + productIds[1])
        .send({
          name: 'Edit by Gateway'
        })
        .then(res => {
          const product = res.body
          expect(res.statusCode).to.equals(200);
          expect(product.name).to.equals('Edit by Gateway')
          done();
        })
        .catch(error => done(error));
    });
  });

  // describe("delete", () => {
  //   it('[OK] --> Delete product information', done => {
  //     request(app)
  //       .delete("/api/v1/products/" + productIds[1])
  //       .then(res => {
  //         const product = res.body
  //         expect(res.statusCode).to.equals(200);
  //         expect(product._id).to.equals(productIds[1])
  //         done();
  //       })
  //       .catch(error => done(error));
  //   });
  // });
});
