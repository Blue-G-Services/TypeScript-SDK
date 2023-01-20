import {IDevices} from "../../ports/services";
import {RevokeDeviceParams} from "./requests/device";
import axios from "axios";
import Meteor from "../../BlueG";

export class Devices implements IDevices{
    async GetMyDevices(): Promise<object[]> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/table/services/devices`,
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

    async RevokeDevice<T extends RevokeDeviceParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.delete(
                `${Meteor._gameApiEndpoint}/api/table/services/users/${input.deviceId}`,
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