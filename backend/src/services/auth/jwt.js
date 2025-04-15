// jwt.js
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "MY_SECRET_KEY"; // 建议写入 .env 文件

// 生成 token
function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "2h" });
}

// 验证 token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  signToken,
  verifyToken,
};
