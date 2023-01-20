import {IUsers} from "../../ports/services";
import {EditCurrentUserParams, FindUsersParams, GetUserByIdParams} from "./requests/user";
import axios from "axios";
import Meteor from "../../BlueG";

export class Users implements IUsers{
    async EditCurrentUser<T extends EditCurrentUserParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.put(
                `${Meteor._gameApiEndpoint}/api/table/services/users`,
                input,
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async FindUsers<T extends FindUsersParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/table/services/users/find`,
                input,
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetCurrentUser(): Promise<object> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/users`,
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async GetUserById<T extends GetUserByIdParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/users/${input.userId}`,
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });

            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }
}