export class GetMyFriendsParams {
    public skip: number = 0;
    public limit: number = 0;
}

export class GetMyFriendshipRequestParams {
    public skip: number = 0;
    public limit: number = 0;
}

export class GetMyFriendshipRequestingParams {
    public skip: number = 0;
    public limit: number = 0;
}

export class RequestFriendshipParams {
    public userId: number = 0;
}

export class AcceptRequestParams {
    public userId: number = 0;
}

export class RejectRequestParams {
    public userId: number = 0;
}

export class DeleteFriendParams {
    public userId: number = 0;
}