const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://karolfaltyn.github.io/solar-sense"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.post("/api", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    const errMsg = error.response
      ? error.response.data
      : "An unknown error occurred";
    res.status(500).json({ error: errMsg });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
