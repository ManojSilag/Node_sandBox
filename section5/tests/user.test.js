const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, UserOneId, setUpDatabase } = require("./fixtures/db");

beforeEach(setUpDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "manoj",
      email: "manoj@gmail.com",
      password: "Mypass",
    })
    .expect(201);

  //Assert that database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  //Assert about response
  // expect(response.body.user.name).toBe('manoj')
  expect(response.body).toMatchObject({
    user: {
      name: "manoj",
      email: "manoj@gmail.com",
    },
    token: user.tokens[0].token,
  });

  expect(user.password).not.toBe("Mypass");
});

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: "mike@gmail.com",
      password: "mike123",
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);

  expect(response.body.token).toBe(user.tokens[1].token);
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

  const user = await User.findById(UserOneId);
  // console.log('dev: user', user)
  expect(user).toBeNull();
});

test("should not delete account for unautherized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("should upload avtar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(UserOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid the user field", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Miketwo",
    })
    .expect(200);
  const user = await User.findById(response.body._id);
  expect(user.name).toBe("Miketwo");
});

test("should not update invalid user field", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      _id: 12333233334,
    })
    .expect(400);
});
