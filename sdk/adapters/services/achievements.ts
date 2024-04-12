import { IAchievements} from "../../ports/services";
import {UnlockAchievementParams} from "./requests/achievements";
import axios from "axios";
import DynamicPixels from "../../DynamicPixels";
import {Achievement} from "../../dto/achievement";

export class Achievements implements IAchievements {
    async GetAchievements(): Promise<Achievement[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/achievements`,
                {
                    headers:{
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async UnlockAchievements<T extends UnlockAchievementParams>(input: T): Promise<void> {
        try {
            await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/achievements`,
                {
                    "achievement_id": input.AchievementId,
                    "step_id": input.StepId
                },
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }
}