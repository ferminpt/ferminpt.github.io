from flask import Flask, render_template, request, jsonify
import paho.mqtt.client as mqtt

app = Flask(__name__)

# Configura tu broker MQTT
MQTT_BROKER = "broker.hivemq.com"
MQTT_PORT = 1883
MQTT_TOPIC = "tienda/pedidos"

# Cliente MQTT
mqtt_client = mqtt.Client()

# Evento al recibir mensaje
received_message = None
def on_message(client, userdata, msg):
    global received_message
    received_message = msg.payload.decode()

mqtt_client.on_message = on_message
mqtt_client.connect(MQTT_BROKER, MQTT_PORT)
mqtt_client.subscribe(MQTT_TOPIC)
mqtt_client.loop_start()

# Rutas Flask
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/send", methods=["POST"])
def send():
    data = request.json
    message = data.get("message", "")
    mqtt_client.publish(MQTT_TOPIC, message)
    return jsonify({"status": "sent", "message": message})

@app.route("/receive", methods=["GET"])
def receive():
    global received_message
    return jsonify({"message": received_message})
