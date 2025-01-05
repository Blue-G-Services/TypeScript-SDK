import {RoomStatus} from "../../../dto/multiplayer";

export enum GameOrderType
{
    Random = 1,
    RoundRobin = 2,
    UserDefined = 3
}

export class CreateRoomParams {
    public Name: string = "";
    public IsPrivate: boolean = false;
    public IsPermanent: boolean = false;
    public MinPlayer: number = 0;
    public MaxPlayer: number = 0;
    public MinXp?: number;
    public MaxXp?: number;
    public Status?: RoomStatus;
    public IsTurnBasedGame?: boolean = false;
    public GameOrderType?: GameOrderType;
    public Metadata: string = "";
    public Players: number[] = [];
}

export class GetAllRoomsParams {
    public Skip: number = 0;
    public Take: number = 0;
}