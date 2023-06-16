import {IUsers} from "../../ports/services";
import {EditCurrentUserParams, FindUsersParams, GetUserByIdParams} from "./requests/user";
import axios from "axios";
import DynamicPixels from "../../DynamicPixels";
import {User} from "../../dto/user";

export class Users implements IUsers{
    async EditCurrentUser<T extends EditCurrentUserParams>(input: T): Promise<User> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/users`,
                input,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async FindUsers<T extends FindUsersParams>(input: T): Promise<User[]> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/users/find`,
                { query: Object.fromEntries(input.query) },
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

    async GetCurrentUser(): Promise<User> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/users`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e :any) {
            throw new Error(e.response.data.message)
        }
    }

    async GetUserById<T extends GetUserByIdParams>(input: T): Promise<User> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/users/${input.userId}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }
}