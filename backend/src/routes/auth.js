// auth.js
// src/routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../data/users");

const router = express.Router();
const SECRET = "MY_SECRET"; // 实际项目中建议放入 .env

// 注册
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: "注册成功" });
});

// 登录
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "账号或密码错误" });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: "2h" });
  res.json({ token });
});

module.exports = router;

