let memory = {
  soilOpen: 30,
  soilClose: 60,
  history: [],
  lastAction: null,
};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Method Not Allowed",
    });
  }

  let { temp, hum, soil, light } = req.body;

  temp = Number(temp);
  hum = Number(hum);
  soil = Number(soil);
  light = Number(light);

  if (
    [temp, hum, soil, light].some((v) => Number.isNaN(v))
  ) {
    return res.status(400).json({
      ok: false,
      message: "Invalid sensor data",
    });
  }

  // =====================
  // Save History
  // =====================

  memory.history.push({
    soil,
    time: Date.now(),
  });

  if (memory.history.length > 50) {
    memory.history.shift();
  }

  // =====================
  // Trend Analysis
  // =====================

  let trend = 0;

  if (memory.history.length >= 5) {
    const recent = memory.history.slice(-5);

    trend =
      recent[0].soil -
      recent[recent.length - 1].soil;
  }

  // =====================
  // Learning Engine
  // =====================

  const avgSoil =
    memory.history.reduce(
      (sum, item) => sum + item.soil,
      0
    ) / memory.history.length;

  if (avgSoil < 35) {
    memory.soilOpen = Math.max(
      20,
      memory.soilOpen - 0.2
    );

    memory.soilClose = Math.max(
      45,
      memory.soilClose - 0.2
    );
  }

  if (avgSoil > 55) {
    memory.soilOpen = Math.min(
      40,
      memory.soilOpen + 0.1
    );

    memory.soilClose = Math.min(
      80,
      memory.soilClose + 0.1
    );
  }

  // =====================
  // AI Decision
  // =====================

  let actions = [];
  let reasons = [];
  let confidence = 90;

  if (soil < memory.soilOpen) {
    actions.push("PUMP_ON");
    reasons.push("Soil below learned threshold");
    confidence = Math.max(confidence, 95);
    memory.lastAction = "water";
  }

  if (soil > memory.soilClose) {
    actions.push("PUMP_OFF");
    reasons.push("Soil moisture sufficient");
    confidence = Math.max(confidence, 93);
    memory.lastAction = "stop";
  }

  if (temp > 35) {
    actions.push("FAN_ON");
    reasons.push("High temperature detected");
    confidence = Math.max(confidence, 96);
  }

  if (trend > 10) {
    actions.push("PREDICT_WATER_SOON");
    reasons.push("Soil drying rapidly");
  }

  if (actions.length === 0) {
    actions.push("STABLE");
    reasons.push("Environment normal");
  }

  return res.status(200).json({
    ok: true,
    data: {
      sensors: {
        temp,
        hum,
        soil,
        light,
      },

      ai: {
        actions,
        reasons,
        confidence,
      },

      learning: {
        soilOpen:
          Number(memory.soilOpen.toFixed(2)),
        soilClose:
          Number(memory.soilClose.toFixed(2)),
        avgSoil:
          Number(avgSoil.toFixed(2)),
        trend,
        samples:
          memory.history.length,
      },
    },
  });
}