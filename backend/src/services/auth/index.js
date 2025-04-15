// index.js

const bcrypt = require("bcrypt");
const { signToken } = require("./jwt");

// 这里使用内存模拟数据库，生产环境应换成数据库
const users = [];

async function register(username, password) {
  const exists = users.find((u) => u.username === username);
  if (exists) throw new Error("用户已存在");

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  return { message: "注册成功" };
}

async function login(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user) throw new Error("用户不存在");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("密码错误");

  const token = signToken({ username: user.username });
  return { token };
}

module.exports = {
  register,
  login,
};
