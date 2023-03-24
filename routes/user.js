const express = require("express"),
  router = express.Router(),
  { dev } = require("../config/config"),
  User = require("../models/User.model"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  cleanCache = require("../middlewares/cleanCache");

require("../helpers/cache");

router.post("/signin", (req, res) => {
  const token = req.header("auth-token");

  if (token) {
    jwt.verify(token, dev.jwt, (err, decoded) => {
      if (err) return res.send(err);
      res.send("successfully logged in");
    });
  }
});

router.post("/signup", async (req, res) => {
  let body = req.body;

  // //* Validation
  const { validationErr } = require("../helpers/userValidation")(body);

  const userExists = await User.findOne({ Email: body.Email });
  if (userExists) res.status(409).send("Email already exists");

  const hashSalt = await bcrypt.genSalt(10);
  const passHashed = await bcrypt.hash(req.body.Password, hashSalt);

  const user = new User({
    Username: req.body.Username,
    Email: req.body.Email,
    Date: req.body.date,
    Password: passHashed,
  });
  // cleanCache()
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
        Username: body.Username,
        password: passHashed,
      },
      dev.jwt
    );
    res.set("auth-token", token);
    res.send(savedUser);
  } catch (ex) {
    return res.send(ex.message);
  }
});

//!! test routes
router.post("/login", async (req, res) => {
  let body = req.body;

  let username = body.username;
  let password = body.password;

  const user = await User.findOne({ Username: username, Password: password });

  if (!user)
    return res.status(422).json({
      status: false,
      message: "کاربر با این نشانی یافت نشد",
    });

  const hashSalt = await bcrypt.genSalt(10);
  const passHashed = await bcrypt.hash(password, hashSalt);
  const token = jwt.sign(
    {
      id: user._id,
      username: username,
      password: passHashed,
    },
    dev.jwt
  );
  res.set("auth-token", token);

  res.json({ status: true, message: "با موفقیت وارد شدیدید", token });
});

router.post("/sign-up", async (req, res) => {
  //* Validation

  const { validationErr } = require("../helpers/userValidation")(req.body);
  req = validationErr;

  const userExists = await User.findOne({ email: req.body.email });
  if (userExists)
    res.status(409).json({
      status: false,
      message: "این ایمیل قبلا ثبت شده است",
    });
  res.json({ status: true, message: "حساب کاربری با موفقیت ساخته شد", user });

  const hashSalt = await bcrypt.genSalt(10);
  const passHashed = await bcrypt.hash(req.body.password, hashSalt);

  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    date: req.body.date,
    password: passHashed,
  });
  cleanCache();
  try {
    const savedUser = await user.save();
    const token = jwt.sign(
      {
        id: savedUser._id,
        username: req.body.username,
        password: passHashed,
      },
      dev.jwt
    );
    res.set("auth-token", token);
    res.send(savedUser);
  } catch (ex) {
    return res.send(ex.message);
  }
});

module.exports = router;
