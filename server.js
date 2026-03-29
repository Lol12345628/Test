import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("✅ Smart Farm AI Backend Running");
});

// ================= AI API =================
app.post("/ai", async (req, res) => {
  const { temp, hum, plant } = req.body;

  // 🔥 เช็ค input
  if (temp == null || hum == null) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "คุณคือ AI เกษตร ตอบสั้นมาก เป็นตัวเลขน้ำ (ml) ปุ๋ย (g) และเหตุผล"
          },
          {
            role: "user",
            content: `พืช ${plant || "ข้าว"} อุณหภูมิ ${temp}°C ความชื้น ${hum}% ต้องการน้ำและปุ๋ยเท่าไหร่`
          }
        ],
        temperature: 0.3
      })
    });

    // 🔥 เช็ค API ล่ม
    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI Error:", errText);
      return res.status(500).json({ error: "OpenAI API error" });
    }

    const data = await response.json();

    // 🔥 กัน undefined
    const text =
      data?.choices?.[0]?.message?.content || "ไม่สามารถวิเคราะห์ได้";

    // 🔥 แยกตัวเลข (แม่นขึ้น)
    const waterMatch = text.match(/(\d+)\s*(ml|มล)/i);
    const fertMatch = text.match(/(\d+)\s*(g|กรัม)/i);

    const water = waterMatch ? waterMatch[1] : "0";
    const fertilizer = fertMatch ? fertMatch[1] : "0";

    res.json({
      water,
      fertilizer,
      reason: text
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ================= SAVE DATA =================
let history = [];

app.post("/save", (req, res) => {
  const { temp, hum } = req.body;

  if (temp == null || hum == null) {
    return res.status(400).json({ error: "Missing data" });
  }

  history.push({
    temp,
    hum,
    time: new Date()
  });

  if (history.length > 100) history.shift();

  res.json({ status: "ok" });
});

// ================= GET HISTORY =================
app.get("/history", (req, res) => {
  res.json(history);
});

// ================= START =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});