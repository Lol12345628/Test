let lastData = {
  temp: 0,
  hum: 0,
  soil: 0,
  light: 0,
  time: null
};

export default function handler(req, res) {

  // =========================
  // 📥 ESP32 ส่งข้อมูลมา (POST)
  // =========================
  if (req.method === "POST") {

    const { temp, hum, soil, light } = req.body || {};

    lastData = {
      temp: Number(temp || 0),
      hum: Number(hum || 0),
      soil: Number(soil || 0),
      light: Number(light || 0),
      time: new Date().toISOString()
    };

    console.log("📡 ESP32 DATA:", lastData);

    return res.status(200).json({
      ok: true,
      message: "data received",
      data: lastData
    });
  }

  // =========================
  // 🌐 เว็บเรียกดูข้อมูลล่าสุด (GET)
  // =========================
  if (req.method === "GET") {

    return res.status(200).json({
      ok: true,
      data: lastData
    });
  }

  // =========================
  // ❌ method อื่น
  // =========================
  res.status(405).json({
    ok: false,
    message: "Method not allowed"
  });
}