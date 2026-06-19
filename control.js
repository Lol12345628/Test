let control = {
  water:0,
  light:0,
  fan:0
};

export default function handler(req,res){

  const cmd = req.query.cmd;

  if(cmd == "water1") control.water = 1;
  if(cmd == "water0") control.water = 0;

  if(cmd == "light1") control.light = 1;
  if(cmd == "light0") control.light = 0;

  if(cmd == "fan1") control.fan = 1;
  if(cmd == "fan0") control.fan = 0;

  res.json(control);
}