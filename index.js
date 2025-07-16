import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCKSJ49B6J1idTQMmju-XxCC7iKouwX_lU",
});

app.post("/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response) {
      throw new Error("No valid response from Gemini");
    }

    res.json({ response });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Gemini Clone</h1>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Gemini backend running at http://localhost:${PORT}`);
});
