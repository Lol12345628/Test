let state = {
  pump: 0,
  fan: 0,
  light: 0
};

export default function handler(req, res) {

  if (req.method === "POST") {

    const { device, value } = req.body;

    if (state.hasOwnProperty(device)) {
      state[device] = value;
    }

    return res.json({ ok: true, state });
  }

  if (req.method === "GET") {
    return res.json(state);
  }

  res.status(405).json({ ok: false });
}