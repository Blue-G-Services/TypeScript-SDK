export class FindUsersParams{
    public query:Map<string, string> = new Map<string, string>()
}

export class GetUserByIdParams{
    public userId:number = 0;
}

export class EditCurrentUserParams{
    public name:string = "";
}