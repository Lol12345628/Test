let state = {
  pump: 0,
  light: 0,
  fan: 0
};

export default function handler(req, res) {

  if (req.method === "GET") {
    return res.json(state);
  }

  if (req.method === "POST") {
    const { device, state: value } = req.body;
    state[device] = value;

    return res.json({ ok: true, state });
  }
}