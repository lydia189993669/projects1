import express from 'express';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRouter);

// 举例：需要登录才能问问题
app.post("/api/chat/ask", authMiddleware, async (req, res) => {
  const { question } = req.body;
  // TODO: 这里接 langchain 做回答
  res.json({ answer: `收到问题 ${question}，来自用户 ${req.user.username}` });
});

app.listen(3000, () => console.log("Server running on port 3000"));
