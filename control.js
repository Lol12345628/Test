let state = {
  pump: 0,
  fan: 0,
  light: 0,
};

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return res.status(200).json(state);

    case "POST": {
      const { device, value } = req.body;

      // ตรวจสอบชื่ออุปกรณ์
      if (
        !device ||
        !Object.prototype.hasOwnProperty.call(state, device)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid device",
        });
      }

      // แปลงค่าเป็น 0 หรือ 1
      state[device] =
        value === 1 ||
        value === "1" ||
        value === true ||
        value === "true"
          ? 1
          : 0;

      return res.status(200).json({
        success: true,
        state,
      });
    }

    default:
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
  }
}