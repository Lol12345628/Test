import serial
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

esp = serial.Serial('COM3', 115200, timeout=1)

@app.route('/control', methods=['POST'])
def control():
    cmd = request.json['cmd']

    print("SEND:", cmd)

    esp.write((cmd + "\n").encode())

    return {"ok": True}

app.run(host="0.0.0.0", port=5000)