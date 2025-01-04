import { ILeaderboards} from "../../ports/services";
import axios from "axios";
import DynamicPixels from "../../DynamicPixels";
import {GetMyFriendsScoresParams, GetMyScoreParams, GetScoresParams, SubmitScoreParams} from "./requests/leaderboard";
import {Leaderboard, PartyScore, Score, UserScore} from "../../dto/leaderboard";

export class Leaderboards implements ILeaderboards{
    async GetFriendsScores<T extends GetMyFriendsScoresParams>(input: T): Promise<UserScore[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}/friends`,
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

    async GetLeaderboards(): Promise<Leaderboard[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/leaderboard`,
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

    async GetMyScore<T extends GetMyScoreParams>(input: T): Promise<UserScore> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}/me`,
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

    async GetUsersScores<T extends GetScoresParams>(input: T): Promise<UserScore[]> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/leaderboard/user/${input.LeaderboardId}?skip=${input.Skip}&limit=${input.Limit}`,
                {},
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


    async GetPartiesScores<T extends GetScoresParams>(input: T): Promise<PartyScore[]> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/leaderboard/party/${input.LeaderboardId}?skip=${input.Skip}&limit=${input.Limit}`,
                {},
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

    async SubmitScore<T extends SubmitScoreParams>(input: T): Promise<Score> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}`,
                {
                    score: input.Score
                }, {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.row;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

}