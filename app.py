from flask import Flask, request, render_template, jsonify
import paho.mqtt.client as mqtt
import ssl
import json

app = Flask(__name__)

MQTT_BROKER = 'mqtt.dsic.upv.es'
MQTT_PORT = 1883
MQTT_TOPIC = 'undefined/tienda'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/enviar', methods=['POST'])
def enviar():
    try:
        data = request.get_json()
        talla = data.get('talla')
        color = data.get('color')

        if not talla or not color:
            return "Datos incompletos", 400

        mensaje = json.dumps({
            'talla': talla,
            'color': color
        })

        mqtt_client = mqtt.Client(transport="websockets")
        mqtt_client.tls_set(cert_reqs=ssl.CERT_NONE)
        mqtt_client.tls_insecure_set(True)

        def on_connect(client, userdata, flags, rc):
            if rc == 0:
                print("Conectado correctamente")
                client.publish(MQTT_TOPIC, mensaje)
            else:
                print(f"Falló la conexión: {rc}")

        mqtt_client.on_connect = on_connect
        mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
        mqtt_client.loop_start()

        import time
        time.sleep(2)
        mqtt_client.loop_stop()

        return 'Mensaje enviado correctamente'
    except Exception as e:
        return f"Error: {str(e)}", 500


if __name__ == '__main__':
    app.run(debug=True)