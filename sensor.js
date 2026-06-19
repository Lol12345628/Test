let data = {
  temp: 0,
  hum: 0,
  soil: 0,
  light: 0
};

export default function handler(req, res) {

  if(req.method === "POST"){
    data = req.body;
    return res.json({ok:true});
  }

  if(req.method === "GET"){
    return res.json(data);
  }
}