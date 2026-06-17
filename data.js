let data = {
  temp: 0,
  hum: 0,
  soil: 0,
  lux: 0
};

export default function handler(req, res) {

  // ESP32 ส่งค่าเข้ามา
  if (req.method === "POST") {
    data = req.body;
    return res.json({ ok: true });
  }

  // Web ขอข้อมูล
  res.json(data);
}