import { Injectable, OnModuleInit } from '@nestjs/common';
import mqtt from 'mqtt/*';
import { WebSocketGatewayService } from 'src/sensor/websocket/websocket.gateway';



@Injectable()
export class MqttService implements OnModuleInit{
    private client : mqtt.MqttClient;

    constructor(private readonly wsGateway : WebSocketGatewayService){}

    onModuleInit() {
        this.client = mqtt.connect('mqtt://broker.hivemq.com:1883');

        this.client.on('connect', () => {
            console.log("MQTT connected");
            this.client.subscribe('sensor/data');
        });

        this.client.on('message', (topic, message) => {
            const payload = message.toString();
            console.log(`MQTT recieves: ${payload}`);

            this.wsGateway.sendData(payload);
        })


    }
}
