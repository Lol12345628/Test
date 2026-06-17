const server = "";

async function getData() {
  try {
    const res = await fetch("/api/data");
    const data = await res.json();

    document.getElementById("temp").innerText = data.temp;
    document.getElementById("hum").innerText = data.hum;
    document.getElementById("soil").innerText = data.soil;
    document.getElementById("lux").innerText = data.lux;

  } catch (err) {
    console.log("data error", err);
  }
}

setInterval(getData, 3000);
getData();