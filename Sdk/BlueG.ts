import { IAuth } from "./ports/authentication";
import { Services } from "./ports/services";
import { IStorage } from "./ports/storage";
import { ITable } from "./ports/table";
import { WebSocketProvider } from "./transport/socket/wss/wss";
import {Auth} from "./adapters/authentication";
import {Table} from "./adapters/table";

class Meteor {
  public static _clientId: string;
  public static _clientSecret: string;
  public static _gameApiEndpoint: string = "https://localhost:7199";
  static token: string = "";
  private static wss: WebSocketProvider;

  public static Auth: IAuth = new Auth();
  public static Storage: IStorage;
  public static Table: ITable = new Table();
  public static Services: Services = new Services();
}

export default Meteor;
