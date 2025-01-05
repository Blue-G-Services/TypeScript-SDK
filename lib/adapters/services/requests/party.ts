import {Party} from "../../../dto/party";

export class GetPartiesParams {
    public query?: string = "";
    public skip: number = 0;
    public limit: number = 25;
}

export class CreatePartyParams{
    public name: string = "";
    public desc: string = "";
    public max_member_count: number = 10;
    public is_private: boolean = false;
    public teams: string[] = [];
    public channels: string[] = [];
    public variables: Map<string, any> = new Map<string, any>();

    public constructor(init?:Partial<CreatePartyParams>) {
        Object.assign(this, init);
    }
}

export class GetSubscribedPartiesParams {
    public query: string | undefined;
    public skip: number = 0;
    public limit: number = 25;
}

export class JoinToPartyParams {
    public partyId: number = 0;
    public team: string = "";
    public channels: string[] = [];
}

export class LeavePartyParams{
    public partyId: number = 0;
}

export class GetPartyByIdParams{
    public partyId: number = 0;
}

export class GetPartyMembersParams{
    public partyId: number = 0;
    public skip: number = 0;
    public limit: number = 25;
}

export class SetMemberVariablesParams{

}

export class GetPartyWaitingMembersParams{
    public partyId: number = 0;
    public skip: number = 0;
    public limit: number = 25;
}

export class EditPartyParams{
    public partyId:number = 0;
    public party: Party = new Party();
}

export class AcceptJoiningParams{
    public partyId: number = 0;
    public membershipId: number = 0;
}

export class RejectJoiningParams{
    public partyId: number = 0;
    public membershipId: number = 0;
}