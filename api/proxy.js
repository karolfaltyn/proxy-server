const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { url } = req.body;

    if (!url) {
      res.status(400).json({ error: "No URL provided" });
      return;
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
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};
