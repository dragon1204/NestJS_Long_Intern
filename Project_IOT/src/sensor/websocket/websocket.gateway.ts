import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "http";

@WebSocketGateway({
    cors : {
        origin: '*',
    },
})

export class WebSocketGatewayService {
    @WebSocketServer()
    server : Server;

    sendData(data : any){
        this.server.emit('sensorUpdate', data);
    }
}