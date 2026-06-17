let state = {
  pump: false,
  light: false,
  fan: false
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