let state = {
pump: 0,
fan: 0,
light: 0
};

export default function handler(req, res) {

if (req.method === "GET") {
return res.status(200).json(state);
}

if (req.method === "POST") {

```
const { device, value } = req.body;

if (
  device &&
  Object.prototype.hasOwnProperty.call(
    state,
    device
  )
) {
  state[device] =
    Number(value) ? 1 : 0;
}

return res.status(200).json({
  success: true,
  state
});
```

}

return res.status(405).json({
success: false,
message: "Method Not Allowed"
});
}
