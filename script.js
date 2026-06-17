// ===== ดึงข้อมูล sensor =====
async function loadData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("temp").innerText = data.temp;
    document.getElementById("hum").innerText = data.hum;
    document.getElementById("soil").innerText = data.soil;
    document.getElementById("lux").innerText = data.lux;

  } catch (err) {
    console.log(err);
  }
}

// ===== ส่งคำสั่ง =====
async function setDevice(device, state) {
  await fetch("/api/control", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ device, state })
  });
}

// refresh ทุก 3 วิ
setInterval(loadData, 3000);
loadData();