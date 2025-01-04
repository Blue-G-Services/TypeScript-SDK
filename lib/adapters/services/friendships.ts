import { IFriendship} from "../../ports/services";
import {
    AcceptRequestParams, DeleteFriendParams, GetMyFriendshipRequestingParams,
    GetMyFriendshipRequestParams,
    GetMyFriendsParams, RejectRequestParams,
    RequestFriendshipParams
} from "./requests/friendship";
import axios from "axios";
import DynamicPixels from "../../DynamicPixels";
import {Friendship} from "../../dto/friendship";

export class Friendships implements IFriendship{
    async AcceptRequest<T extends AcceptRequestParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/request/${input.userId}`,
                {},
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async DeleteFriend<T extends DeleteFriendParams>(input: T): Promise<boolean> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/${input.userId}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetMyFriends<T extends GetMyFriendsParams>(input: T): Promise<Friendship[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetMyFriendshipRequests<T extends GetMyFriendshipRequestParams>(input: T): Promise<Friendship[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/request?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetMyFriendshipRequesting<T extends GetMyFriendshipRequestingParams>(input: T): Promise<Friendship[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/requesting?skip=${input.skip}&limit=${input.limit}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async RejectAllRequests(): Promise<void> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/request`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
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
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/request/${input.userId}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
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
                `${DynamicPixels._gameApiEndpoint}/api/table/services/friendship/request`,
                {"target_user_id": input.userId},
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });
            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

}