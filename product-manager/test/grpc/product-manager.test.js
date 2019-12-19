process.env.NODE_ENV = "test";
require("../../src/program").start();
const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const { ProductModel } = require("../../src/models");
const products = require("../products.json");
const client = require("./client");
let productIds = {}

describe("ProductManager", () => {
  before(done => {
    Promise.all([ProductModel.deleteMany({})])
      .then(result => done())
      .catch(done);
  });

  describe("create", () => {
    it('[OK] --> Product "Iphone X" information', done => {
      client
        .request("create", products[0])
        .then(product => {
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });

    it('[OK] --> Product "Iphone 8" information', done => {
      client
        .request("create", products[1])
        .then(product => {
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });

    it('[OK] --> Product "Samsung A3" information', done => {
      client
        .request("create", products[2])
        .then(product => {
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });

    it('[OK] --> Product "Xiaomi 9" information', done => {
      client
        .request("create", products[3])
        .then(product => {
          expect(product).to.haveOwnProperty("_id");
          expect(product)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(product)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });
  });

  describe("list", () => {
    it("[OK] --> List products infomation", done => {
      client
        .request("list", {
          fields: "name price",
          limit: 3,
          page: 1,
          sort: {
            name: "-1"
          },
          filter: {
            name: 'Iphone X'
          }
        })
        .then(products => {
          expect(products.length).to.greaterThan(0);
          expect(products[0]).to.not.have.property("createdAt");
          // Save productIds - use to update/delete product
          productIds = products.map(product => product._id)
          done();
        })
        .catch(done);
    });
  });

  describe('update', () => {
    it('[OK] --> Update product information', (done) => {
      client.request('update', {
        id: productIds[0],
        product: {
          name: 'Product Edit'
        }
      })
        .then(product => {
          expect(product.name).to.equals('Product Edit')
          done();
        })
        .catch(done);
    });
  });

  describe('delete', () => {
    it('[OK] --> Delete product information', (done) => {
      client.request('delete', {
        id: productIds[0],
      })
        .then(product => {
          expect(product._id).to.equals(productIds[0])
          done();
        })
        .catch(done);
    });
  });
});
