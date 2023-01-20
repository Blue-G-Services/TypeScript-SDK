export class GetScoresParams{
    public LeaderboardId:number = 0;
    public Skip :number= 0;
    public Limit:number = 25;
}

export class GetMyScoreParams{
    public LeaderboardId:number = 0;
}

export class GetMyFriendsScoresParams{
    public LeaderboardId:number = 0;
    public Skip :number= 0;
    public Limit:number = 25;
}

export class SubmitScoreParams{
    public LeaderboardId:number = 0;
    public Score: Number = 0;
}