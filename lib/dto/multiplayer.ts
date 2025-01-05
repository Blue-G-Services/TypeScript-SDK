
export enum MatchStatus {
    Init = 0,
    Started = 1,
    Paused = 2,
    Resumed = 3,
    Finished = 4,
    Aborted = 5
}

export enum RoomStatus
{
    Initial = 0,
    Open = 1,
    Lock = 2
}

export enum PlayerState
{
    Init = 1,
    Timeout = 2,
    LostConnection = 3,
    GameOver = 4,
    Win = 5,
}

export enum GameOrderType
{
    Random = 1,
    RoundRobin = 2,
    UserDefined = 3
}

export class RoomPlayer {
    public UserId: number = 0;
    public Metadata: string = "";
    public Tags: string[] = [];
}

export class MatchPlayer {
    public UserId: number = 0;
    public IsTurn?: boolean;
    public State: PlayerState = PlayerState.Init;
    public Tags: string[] = [];
    public Metadata: string = "";
}

export class Room {
    public Id: number = 0;
    public Name: string = "";
    public IsPrivate: boolean = false;
    public MinPlayer: number = 0;
    public MaxPlayer: number = 10;
    public MinXp?: number = 0;
    public MaxXp?: number = 0;
    public IsPermanent: boolean = false;
    public Status: RoomStatus = RoomStatus.Initial;
    public IsTurnBasedGame: boolean = false;
    public IsLocked: boolean = false;
    public GameOrderType?: GameOrderType;
    public Metadata: string = "";
    public CreatorId: number = 0;
    public Players: RoomPlayer[] = [];
}

export class Match {
    public Id: number = 0;
    public RoomId: number = 0;
    public Status: MatchStatus = MatchStatus.Init;
    public Metadata: string = "";
    public Players: MatchPlayer[] = [];
    public Room: Room = new Room();
}

export class UserSummary {
    public Id: number = 0;
    public Username: string = "";
    public Avatar: string = "";
}

export class MatchSummary {
    public Id: number = 0;
    public RoomId: number = 0;
    public RoomName: number = 0;
    public Status: MatchStatus = MatchStatus.Init;
    public Players: UserSummary[] = [];
}