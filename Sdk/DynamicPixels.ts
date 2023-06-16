import { IAuth } from "./ports/authentication";
import { Services } from "./ports/services";
import { IStorage } from "./ports/storage";
import { ITable } from "./ports/table";
import {webSocketProvider, WebSocketProvider} from "./transport/socket/wss/wss";
import {Auth} from "./adapters/authentication";
import {Table} from "./adapters/table";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = String(0);

class DynamicPixels {
  public static _clientId: string;
  public static _clientSecret: string;
  // public static _gameApiEndpoint: string = "https://api.dynamicpixels.dev";
  public static _gameApiEndpoint: string = "http://localhost:5114";
  static token: string = "";
  public static wss: WebSocketProvider ;
  // = new webSocketProvider("wss://localhost:3010");

  public static Auth: IAuth = new Auth();
  public static Storage: IStorage;
  public static Table: ITable = new Table();
  public static Services: Services = new Services();
}

export default DynamicPixels;
