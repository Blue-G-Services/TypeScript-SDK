import {ConnectionInfo, IAuth} from "./ports/authentication";
import { Services } from "./ports/services";
import { IStorage } from "./ports/storage";
import { ITable } from "./ports/table";
import {webSocketProvider, WebSocketProvider} from "./transport/socket/wss/wss";
import {Auth} from "./adapters/authentication";
import {Table} from "./adapters/table";
import {Storage} from "./adapters/storage";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = String(0);

class DynamicPixels {

  public static Setup(clientId: string, clientSecret: string, isDevelopment: boolean) {
    this._clientId = clientId;
    this._clientSecret = clientSecret;
    if(!isDevelopment)
      this._gameApiEndpoint = `https://link.dynamicpixels.dev/game/${this._clientId}`;
    else
      this._gameApiEndpoint = "http://localhost:5114";
  }

  public static _clientId: string;
  public static _clientSecret: string;
  public static _gameApiEndpoint: string;
  static token: string = "";
  public static socket: WebSocketProvider;

  public static Configure(token: string, connection: ConnectionInfo){
    DynamicPixels.token = token;
    if(connection.protocol == "wss")
      DynamicPixels.socket = new webSocketProvider(`ws://${connection.endpoint}`, token)
  }

  public static Auth: IAuth = new Auth();
  public static Storage: IStorage = new Storage();
  public static Table: ITable = new Table();
  public static Services: Services = new Services();
}

export default DynamicPixels;
