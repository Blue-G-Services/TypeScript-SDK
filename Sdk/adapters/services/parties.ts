import {Party, PartyMember} from "../../dto/Party";
import {IParty} from "../../ports/services";
import {
    AcceptJoiningParams,
    CreatePartyParams,
    EditPartyParams,
    GetPartiesParams,
    GetPartyByIdParams,
    GetPartyMembersParams,
    GetPartyWaitingMembersParams,
    GetSubscribedPartiesParams,
    JoinToPartyParams, LeavePartyParams, RejectJoiningParams, SetMemberVariablesParams
} from "./requests/party";
import axios from "axios";
import DynamicPixels from "../../DynamicPixels";

export class Parties implements IParty {
    async AcceptJoining<T extends AcceptJoiningParams>(input: T): Promise<PartyMember> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}/waiting/${input.membershipId}`,
                {},
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async CreateParty<T extends CreatePartyParams>(input: T): Promise<Party> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties`,
                {data:input},
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async EditParty<T extends EditPartyParams>(input: T): Promise<Party> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async GetParties<T extends GetPartiesParams>(input: T): Promise<Party[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties?${input.query !== undefined && `query=${input.query}&`}skip=${input.skip}&limit=${input.limit}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async GetPartyById<T extends GetPartyByIdParams>(input: T): Promise<Party> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async GetPartyMembers<T extends GetPartyMembersParams>(input: T): Promise<PartyMember[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}/members?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async GetPartyWaitingMembers<T extends GetPartyWaitingMembersParams>(input: T): Promise<Party[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}/waiting?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async GetSubscribedParties<T extends GetSubscribedPartiesParams>(input: T): Promise<Party[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/me?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async JoinToParty<T extends JoinToPartyParams>(input: T): Promise<PartyMember> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async LeaveParty<T extends LeavePartyParams>(input: T): Promise<void> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async RejectJoining<T extends RejectJoiningParams>(input: T): Promise<PartyMember> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/parties/${input.partyId}/waiting/${input.membershipId}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async SetMemberVariables<T extends SetMemberVariablesParams>(input: T): Promise<PartyMember> {
        return Promise.resolve(new PartyMember());
    }
}