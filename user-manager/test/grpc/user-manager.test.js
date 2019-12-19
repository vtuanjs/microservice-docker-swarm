process.env.NODE_ENV = "test";
require("../../src/program").start();
const { describe, it, before } = require("mocha");
const { expect } = require("chai");
const { UserModel } = require("../../src/models");
const users = require("../users.json");
const client = require("./client");
let userIds = {}

describe("UserManager", () => {
  before(done => {
    Promise.all([UserModel.deleteMany({})])
      .then(result => done())
      .catch(done);
  });

  describe("create", () => {
    it('[OK] --> User "Nguyễn Văn Tuấn" information', done => {
      client
        .request("create", users[0])
        .then(user => {
          expect(user).to.haveOwnProperty("_id");
          expect(user)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(user)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });

    it('[OK] --> User "Ngọc An" information', done => {
      client
        .request("create", users[1])
        .then(user => {
          expect(user).to.haveOwnProperty("_id");
          expect(user)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(user)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });

    it('[OK] --> User "Giang Lê information', done => {
      client
        .request("create", users[2])
        .then(user => {
          expect(user).to.haveOwnProperty("_id");
          expect(user)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(user)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });

    it('[OK] --> User "Văn Hùng" information', done => {
      client
        .request("create", users[3])
        .then(user => {
          expect(user).to.haveOwnProperty("_id");
          expect(user)
            .to.haveOwnProperty("createdAt")
            .to.be.a("string");
          expect(user)
            .to.haveOwnProperty("updatedAt")
            .to.be.a("string");
          done();
        })
        .catch(done);
    });
  });

  describe("list", () => {
    it("[OK] --> List users infomation", done => {
      client
        .request("list", {
          fields: "name",
          limit: 3,
          page: 1,
          sort: {
            name: "-1"
          },
          filter: {
            name: 'Giang Lê'
          }
        })
        .then(users => {
          expect(users.length).to.greaterThan(0);
          expect(users[0]).to.not.have.property("createdAt");
          // Save userIds - use to update/delete user
          userIds = users.map(user => user._id)
          done();
        })
        .catch(done);
    });
  });

  describe('update', () => {
    it('[OK] --> Update user information', (done) => {
      client.request('update', {
        id: userIds[0],
        user: {
          name: 'User Edit'
        }
      })
        .then(user => {
          expect(user.name).to.equals('User Edit')
          done();
        })
        .catch(done);
    });
  });

  describe('delete', () => {
    it('[OK] --> Delete user information', (done) => {
      client.request('delete', {
        id: userIds[0],
      })
        .then(user => {
          expect(user._id).to.equals(userIds[0])
          done();
        })
        .catch(done);
    });
  });
});
