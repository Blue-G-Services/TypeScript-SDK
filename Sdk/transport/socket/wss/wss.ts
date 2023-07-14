import WebSocket from "isomorphic-ws";

export class Packet {
  // public game_id: string = "";
  // public user_id: string = "";
  public protocol: string = "wss";
  public method: string = "";
  public payload: string = "";

  public constructor(init?:Partial<Packet>) {
    Object.assign(this, init);
  }

  Transform(): object {
    return {
      "2": this.protocol,
      "4": this.method,
      "5": this.payload
    }
  }
}

export interface WebSocketProvider {
  Send(packet: Packet): void;
}

export class webSocketProvider implements WebSocketProvider {
  private static _client: WebSocket;
  public static onReceive: Event = new Event('receive', { bubbles: true, cancelable: false, composed: false });

  constructor(wssEdgeEndpoint: string, token: string) {
    console.log(`Connecting to ${wssEdgeEndpoint}`);

    webSocketProvider._client = new WebSocket(
        wssEdgeEndpoint+`?token=${token}`,
    );

    webSocketProvider._client.onopen = function open() {
      console.log("connect to wss edge");
    };

    webSocketProvider._client.onclose = function close() {
      console.log("disconnect from wss edge");
    };

    webSocketProvider._client.onmessage = function incoming(data: any) {
      console.log(`incoimng message: ${data}`);

      // webSocketProvider.onReceive.
    };

    console.log(`Connected to ${wssEdgeEndpoint}`);

  }

  Send(packet: Packet) {
    webSocketProvider._client.send(JSON.stringify(packet.Transform()));
  }
}
