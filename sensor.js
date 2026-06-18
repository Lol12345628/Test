let sensorData = {
temp: 0,
hum: 0,
soil: 0,
light: 0,
updatedAt: null
};

export default function handler(req, res) {

if (req.method === "POST") {

```
const {
  temp,
  hum,
  soil,
  light
} = req.body;

sensorData = {
  temp: Number(temp) || 0,
  hum: Number(hum) || 0,
  soil: Number(soil) || 0,
  light: Number(light) || 0,
  updatedAt: Date.now()
};

return res.status(200).json({
  success: true,
  data: sensorData
});
```

}

if (req.method === "GET") {

```
return res.status(200).json({
  success: true,
  data: sensorData
});
```

}

return res.status(405).json({
success: false
});
}
