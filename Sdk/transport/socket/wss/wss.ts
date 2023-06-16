import WebSocket from "isomorphic-ws";

export class Packet {
  public game_id: string = "";
  public user_id: string = "";
  public protocol: string = "";
  public method: string = "";
  public payload: string = "";
}

export interface WebSocketProvider {
  Send(packet: Packet): void;
}

export class webSocketProvider implements WebSocketProvider {
  private static _client: WebSocket;

  constructor(wssEdgeEndpoint: string) {
    webSocketProvider._client = new WebSocket(wssEdgeEndpoint);

    webSocketProvider._client.onopen = function open() {
      console.log("connect to wss edge");
    };

    webSocketProvider._client.onclose = function close() {
      console.log("disconnect from wss edge");
    };

    webSocketProvider._client.onmessage = function incoming(data: any) {
      console.log(`incoimng message: ${data}`);
    };
  }

  Send(packet: Packet) {
    webSocketProvider._client.send(JSON.stringify(packet));
  }
}
