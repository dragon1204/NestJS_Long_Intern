import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { MqttService } from './mqtt/mqtt.service';
import { WebSocketGatewayService } from './websocket/websocket.gateway';

@Module({
  controllers: [SensorController],
  providers: [SensorService, MqttService, WebSocketGatewayService]
})
export class SensorModule {}
