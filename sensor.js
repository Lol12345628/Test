let lastData = {
  temp: 0,
  hum: 0,
  soil: 0,
  light: 0,
  time: null
};

export default function handler(req, res) {

  if (req.method === "POST") {

    const { temp, hum, soil, light } = req.body;

    lastData = {
      temp: Number(temp),
      hum: Number(hum),
      soil: Number(soil),
      light: Number(light),
      time: Date.now()
    };

    return res.json({ ok: true, data: lastData });
  }

  if (req.method === "GET") {
    return res.json({ ok: true, data: lastData });
  }

  res.status(405).json({ ok: false });
}