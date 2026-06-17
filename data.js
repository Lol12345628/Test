let latest = {
  temp: 0,
  hum: 0,
  soil: 0,
  lux: 0
};

export default function handler(req, res) {
  if (req.method === "POST") {
    latest = req.body; // ESP32 ส่งมา
    return res.json({ ok: true });
  }

  res.json(latest);
}