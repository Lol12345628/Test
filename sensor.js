let data = {
  temp: 0,
  hum: 0,
  soil: 0,
  light: 0
};

export default function handler(req, res) {

  // 📥 ESP32 ส่งข้อมูลมา
  if (req.method === "POST") {
    try {
      data = req.body;
      return res.status(200).json({ ok: true, data });
    } catch (err) {
      return res.status(500).json({ error: "Invalid data" });
    }
  }

  // 📤 เว็บดึงข้อมูล
  if (req.method === "GET") {
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}