import { WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway({ path: '/', cors: { origin: '*' }, transports: ['websocket'] })
export class WebSocketGatewayService implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('Client connected');
  }

  sendData(data: any) {
    this.server.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ event: 'sensorUpdate', data }));
      }
    });
  }
}
