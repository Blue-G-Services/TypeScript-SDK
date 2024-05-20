import {IDevices} from "../../ports/services";
import {RevokeDeviceParams} from "./requests/device";
import axios from "axios";
import Meteor from "../../DynamicPixels";
import DynamicPixels from "../../DynamicPixels";
import { Device } from "../../dto/device";

export class Devices implements IDevices{
    async GetMyDevices(): Promise<Device[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/devices`,
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

    async RevokeDevice<T extends RevokeDeviceParams>(input: T): Promise<void> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/users/${input.deviceId}`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

}