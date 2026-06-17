async function setDevice(device, state) {

  try {
    const res = await fetch("/api/control", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        device,
        state
      })
    });

    const data = await res.json();
    console.log(data);

  } catch (err) {
    console.log("control error", err);
  }
}