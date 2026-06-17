async function load() {
  const res = await fetch("/api/data");
  const d = await res.json();

  temp.innerText = d.temp;
  hum.innerText = d.hum;
  soil.innerText = d.soil;
  lux.innerText = d.lux;
}

async function set(device, state) {
  await fetch("/api/control", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({device, state})
  });
}

setInterval(load, 3000);
load();