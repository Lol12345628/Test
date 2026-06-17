import serial
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 🔥 เปลี่ยน COM ให้ตรงเครื่อง (COM3 / COM5)
esp = serial.Serial('COM3', 115200, timeout=1)

print("USB Bridge Running...")

@app.route('/control', methods=['POST'])
def control():

    data = request.json
    cmd = data['cmd']

    print("Send:", cmd)

    esp.write((cmd + "\n").encode())

    return {"ok": True, "cmd": cmd}

@app.route('/')
def home():
    return "ESP32 USB Bridge OK"

app.run(host="0.0.0.0", port=5000)