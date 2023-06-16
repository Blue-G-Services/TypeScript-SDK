export class Leaderboard {
    public id:number = 0;
    public name: string = "";
    public desc: string = "";
    public order: number = 0;
    public participants: number = 0;
    public course: number = 0;
    public timeframe: number = 0;
    public round: number = 0;
    public winners_count: number = 0;
    public last_wipe: string = "";
}

export class Score{
    public leaderboard: number = 0;
    public player: number = 0;
    public is_me: boolean = false;
    public is_friend: boolean = false;
    public value: number = 0;
    public tries: number = 0;
    public rank: number = 0;
}

export class UserScore{
    public id: number = 0;

    public name: string = "";
    public image: string = "";
    public username: string = "";
    public label: string = "";
    public tags: string = "";
    public is_ban: boolean = false;
    public is_tester: boolean = false;
    public is_guest: boolean = false;
    public first_login: string = "";
    public last_login: string = "";

    public value: number = 0;
    public tries: number = 0;
    public rank: number = 0;
    public is_me: boolean = false;
    public is_friend: boolean = false;
    public created_at: string = "";
    public updated_at: string = "";
}

export class PartyScore{
    public id: number = 0;

    public name: string = "";
    public image: string = "";
    public desc: string = "";
    public is_private: boolean = false;
    public data: string = "";
    public variable: string = "";
    public owner: number = 0;

    public value: number = 0;
    public tries: number = 0;
    public rank: number = 0;
    public is_me: boolean = false;
    public created_at: string = "";
    public updated_at: string = "";
}