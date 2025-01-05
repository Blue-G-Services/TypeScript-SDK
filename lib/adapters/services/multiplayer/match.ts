import {IMatchService} from "../../../ports/services";
import {Match, MatchSummary} from "../../../dto/multiplayer";
import axios from "axios";
import DynamicPixels from "../../../DynamicPixels";

export class MatchService implements IMatchService {
    async GetMyMatches(): Promise<MatchSummary[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/multiplayer/matches`,
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

    async LoadMatch(matchId: number): Promise<Match> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/multiplayer/matches/${matchId}`,
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

    async MakeAndStartMatch(roomId: number, lockRoom: boolean): Promise<Match> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/multiplayer/matches/makeAndStart`,
                {
                    "rood_id": roomId,
                    "lock_room": lockRoom
                },
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

    async MakeMatch(roomId: number, lockRoom: boolean): Promise<Match> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/multiplayer/matches`,
                {
                    "rood_id": roomId,
                    "lock_room": lockRoom
                },
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

}