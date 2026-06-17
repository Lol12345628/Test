const ctx =
document.getElementById("tempChart");

const chart = new Chart(ctx,{
type:"line",
data:{
labels:[],
datasets:[{
label:"Temperature",
data:[]
}]
}
});

async function loadData(){

const res =
await fetch("/api/data");

const data =
await res.json();

document.getElementById("temp").innerHTML =
data.temp + " °C";

document.getElementById("hum").innerHTML =
data.hum + " %";

document.getElementById("soil").innerHTML =
data.soil;

document.getElementById("lux").innerHTML =
data.lux;

document.getElementById("pumpStatus").className =
data.pump ? "badge on":"badge off";

document.getElementById("lightStatus").className =
data.light ? "badge on":"badge off";

document.getElementById("fanStatus").className =
data.fan ? "badge on":"badge off";

chart.data.labels.push(
new Date().toLocaleTimeString()
);

chart.data.datasets[0].data.push(
data.temp
);

if(chart.data.labels.length > 20){
chart.data.labels.shift();
chart.data.datasets[0].data.shift();
}

chart.update();

document.getElementById("lastUpdate").innerHTML =
"Last Update : " +
new Date().toLocaleString();

}

setInterval(loadData,2000);

loadData();

async function sendCommand(device,state){

await fetch("/api/control",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
device,
state
})
});

}
