import { IFriendship} from "../../ports/services";
import {
    AcceptRequestParams,
    GetMyFriendshipRequestParams,
    GetMyFriendsParams, RejectRequestParams,
    RequestFriendshipParams
} from "./requests/friendship";
import axios from "axios";
import Meteor from "../../BlueG";

export class Friendship implements IFriendship{
    async AcceptRequest<T extends AcceptRequestParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship/request/${input.requestId}`,
                {},
                {});

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async DeleteFriend<T extends RequestFriendshipParams>(input: T): Promise<boolean> {
        try {
            let {data} = await axios.delete(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship/${input.targetUserId}`,
                {});

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetMyFriends<T extends GetMyFriendsParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship?skip=${input.skip}&limit=${input.limit}`,
                {});

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetMyFriendshipRequests<T extends GetMyFriendshipRequestParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship/request?skip=${input.skip}&limit=${input.limit}`,
                {});

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async RejectAllRequests(): Promise<void> {
        try {
            let {data} = await axios.delete(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship/request`,
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async RejectRequest<T extends RejectRequestParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.delete(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship/request/${input.requestId}`,
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async RequestFriendship<T extends RequestFriendshipParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/table/services/friendship/request`,
                {"user_id": input.targetUserId},
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });
            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

}