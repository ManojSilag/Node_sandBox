const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../src/app");
const User = require("../src/models/user");

const UserOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: UserOneId,
  name: "Mike",
  email: "mike@gmail.com",
  password: "mike123",
  tokens: [
    {
      token: jwt.sign({ _id: UserOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

test("Should signup a new user", async () => {
  await request(app)
    .post("/users")
    .send({
      name: "manoj",
      email: "manoj@gmail.com",
      password: "Mypass",
    })
    .expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "mike@gmail.com",
      password: "mike123",
    })
    .expect(200);
});

test("Should not login nonExisting user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "mike@yahoo.com",
      password: "123mike",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get profile for  unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("should delete account for user", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not delete account for unautherized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});
