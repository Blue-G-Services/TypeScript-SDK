export class Party{
    public id: number = 0;
    public name: string = "";
    public desc: string = "";
    public image: string = "";
    public max_member_count: number = 0;
    public is_private: boolean = false;
    public teams: string = "";
    public channels: string = "";
    public variables: Map<string, any> = new Map<string, any>();
}

export class PartyMember{
    public id: number = 0;
    public name: string = "";
    public image: string = "";
    public username: string = "";
    public role: number = 0;
    public status: number = 0;
    public variables: Map<string, any> = new Map<string, any>();
    public teams: string = "";
    public channels: string[] = [];
}