let data = { temp:0, hum:0, soil:0, lux:0 };

export default function handler(req,res){

  if(req.method === "POST"){
    data = req.body;
    return res.json({ok:true});
  }

  res.json(data);
}