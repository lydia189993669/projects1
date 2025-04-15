// legal.js
const express = require("express");
const { retrieveDocuments } = require("../services/rag/retriever");
const { generateLegalAnswer } = require("../services/rag/llm");
const authMiddleware = require("../middleware/auth"); // ✅ 鉴权中间件

const router = express.Router();

// ✅ 加入鉴权中间件
router.post("/ask", authMiddleware, async (req, res) => {
  try {
    const { question, category } = req.body;
    const username = req.user?.username; // 从 token 中取出的用户名

    // 1. 检索法律条文
    const context = await retrieveDocuments(question, category);

    // 2. 生成回答
    const answer = await generateLegalAnswer(context, question);

    // 3. 返回响应
    res.json({ question, answer, user: username });
  } catch (err) {
    console.error("法律问答出错:", err);
    res.status(500).json({ error: "法律咨询服务暂时不可用" });
  }
});

module.exports = router;
