
export default function handler(req,res){
 const cmd=req.query.cmd;
 return res.json({ok:true,cmd});
}