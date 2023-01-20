import { IAchievements} from "../../ports/services";
import {UnlockAchievementParams} from "./requests/achievements";
import axios from "axios";
import Meteor from "../../BlueG";

export class Achievements implements IAchievements {
    async GetAchievements(): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/achievements`,
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

    async GetUserAchievements(): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/achievements/me`,
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

    async UnlockAchievements<T extends UnlockAchievementParams>(input: T): Promise<void> {
        try {
            await axios.post(
                `${Meteor._gameApiEndpoint}/api/table/services/achievements`,
                {
                    "achievement_id": input.AchievementId
                },
                {
                    headers:{
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }
}