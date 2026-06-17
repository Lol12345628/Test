let latest = {
temp:28,
hum:65,
soil:1800,
lux:250,
pump:false,
light:false,
fan:false
};

export default function handler(req,res){

if(req.method==="POST"){

latest=req.body;

return res.status(200).json({
success:true
});

}

res.status(200).json(latest);

}
