let control = {
  water: 0,
  light: 0,
  fan: 0
};

export default function handler(req, res) {

  const { cmd } = req.query;

  // 🔘 เปิด/ปิดน้ำ
  if (cmd === "water1") control.water = 1;
  if (cmd === "water0") control.water = 0;

  // 💡 ไฟ
  if (cmd === "light1") control.light = 1;
  if (cmd === "light0") control.light = 0;

  // 🌬 พัดลม
  if (cmd === "fan1") control.fan = 1;
  if (cmd === "fan0") control.fan = 0;

  // 📤 ส่งค่ากลับ
  return res.status(200).json({
    ok: true,
    control
  });
}