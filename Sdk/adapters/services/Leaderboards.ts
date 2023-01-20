import { ILeaderboards} from "../../ports/services";
import axios from "axios";
import Meteor from "../../BlueG";
import {GetMyFriendsScoresParams, GetMyScoreParams, GetScoresParams, SubmitScoreParams} from "./requests/leaderboard";

export class Leaderboards implements ILeaderboards{
    async GetFriendsScores<T extends GetMyFriendsScoresParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}/friends`,
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

    async GetLeaderboards(): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/leaderboard`,
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

    async GetMyScore<T extends GetMyScoreParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}/me`,
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

    async GetScores<T extends GetScoresParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}?skip=${input.Skip}&limit=${input.Limit}`,
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

    async SubmitScore<T extends SubmitScoreParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/table/services/leaderboard/${input.LeaderboardId}`,
                {
                    score: input.Score
                }, {
                    headers: {
                        "Authorization": `bearer ${Meteor.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

}