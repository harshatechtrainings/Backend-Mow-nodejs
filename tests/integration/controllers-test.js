/** @format */

// your-integration-test.js
const { expect } = require("chai");
const request = require("supertest"); // Install supertest for HTTP request testing
const app = require("../../app"); // Replace with the actual app setup
// const User = require('../../src/models/User');
const { Status } = require("../../src/utils/errorCodes");
const db = require("../../src/config/db");

describe("Integration Tests", () => {
  const testUser = {
    fullname: "reddy1",
    username: "reddy1",
    password: "reddy1",
    confirmPassword: "reddy1",
  };

  it("should test an Signup endpoint", async () => {
    const response = await request(app).post("/auth/signup").send(testUser);
    expect(response.statusCode).to.equal(201);
    expect(response.body).to.deep.equal({ message: StatusMessage.SUCCESS });
  });

  it("should test an Signin endpoint", async () => {
    const response = await request(app)
      .post("/auth/signin")
      .send({ username: testUser.username, password: testUser.password });
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({
      message: StatusMessage.SUCCESS,
      username: testUser.username,
    });
  });

  it("should test an delete endpoint", async () => {
    const response = await request(app)
      .delete(`/auth/user/${testUser.username}`)
      .send({ username: testUser.username, password: testUser.password });
    // console.log(response);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.deep.equal({ message: StatusMessage.SUCCESS });
  });
});
