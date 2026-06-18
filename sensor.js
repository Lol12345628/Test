let lastData = {
  temp: 0,
  hum: 0,
  soil: 0,
  light: 0,
  ai: "STABLE",
  reason: "normal",
  confidence: 90
};

export default function handler(req, res) {

  if (req.method === "POST") {

    const { temp, hum, soil, light } = req.body;

    let ai = "STABLE";
    let reason = "สภาพปกติ";
    let confidence = 90;

    // 🌱 soil priority
    if (soil < 30) {
      ai = "PUMP ON";
      reason = "ดินแห้ง → ต้องรดน้ำ";
      confidence = 93;
    }

    // 🌡 temp override
    if (temp > 35) {
      ai = "FAN ON";
      reason = "อุณหภูมิสูง → เปิดพัดลม";
      confidence = 95;
    }

    // 💡 light
    if (light < 100) {
      ai = "LIGHT ON";
      reason = "แสงน้อย → เปิดไฟช่วยพืช";
      confidence = 88;
    }

    lastData = {
      temp,
      hum,
      soil,
      light,
      ai,
      reason,
      confidence
    };

    return res.json({ ok: true, data: lastData });
  }

  if (req.method === "GET") {
    return res.json({ ok: true, data: lastData });
  }

  res.status(405).json({ ok: false });
}