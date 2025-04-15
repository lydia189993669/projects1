// src/middleware/auth.js
const { verifyToken } = require("../services/auth/jwt");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "缺少 token" });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);
  if (!payload) return res.status(403).json({ error: "token 无效或已过期" });

  req.user = payload;
  next();
}

module.exports = authMiddleware;
