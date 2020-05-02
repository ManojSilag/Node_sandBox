const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const User = require("../models/user");
const multer = require("multer");

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredtentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    console.log("dev: auth -> e", e);
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  // try {
  //   const user = await User.find({});
  //   res.send(user);
  // } catch (error) {
  //   res.status(500).send();
  // }
  res.send(req.user);
});

const upload = multer({
  dest: "avatar",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error("File must be image with jpg, jpeg and png extension")
      );
    }
    cb(undefined, true);
    // cb(new Error('File must be'))
    // cd(undefined, true)
    // cb(undefined, false)
  },
});

router.post(
  "/users/me/avatar",
  upload.single("avatar"),
  (req, res) => {
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ Error: error.message });
  }
);

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allwedUpdates = ["name", "email", "age", "password"];
  const isValidOperation = updates.every((update) => {
    return allwedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
