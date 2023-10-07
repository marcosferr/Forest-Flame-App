const fs = require("fs");

const query = async (filename) => {
  const data = fs.readFileSync(filename);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/EdBianchi/vit-fire-detection",
    {
      headers: {
        Authorization: `Bearer ${process.env.FIRE_DET_KEY}`,
      },
      method: "POST",
      body: data,
    }
  );
  const result = await response.json();
  return result;
};

module.exports = query;
