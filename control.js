let control = {
pump:false,
light:false,
fan:false
};

export default function handler(req,res){

if(req.method==="POST"){

const {
device,
state
} = req.body;

control[device]=state;

return res.status(200).json({
success:true
});

}

res.status(200).json(control);

}
