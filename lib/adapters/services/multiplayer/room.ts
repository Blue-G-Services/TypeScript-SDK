import {IRoomService} from "../../../ports/services";
import {CreateRoomParams, GetAllRoomsParams} from "../requests/multiplayer";
import {Room, RoomStatus} from "../../../dto/multiplayer";
import axios from "axios";
import DynamicPixels from "../../../DynamicPixels";

export class RoomService implements IRoomService {
    async AutoMatch(): Promise<Room> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/autoMatch`,
                {},
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

    async CreateAndOpenRoom(input: CreateRoomParams): Promise<Room> {
        input.Status = RoomStatus.Open;
        return this.CreateRoom(input);
    }

    async CreateRoom(input: CreateRoomParams): Promise<Room> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms`,
                input,
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

    async DeleteRoom(roomId: number): Promise<void> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/${roomId}`,
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

    async GetAllMatchedRooms(inputParams: GetAllRoomsParams): Promise<Room[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/matched`,
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

    async GetAllRooms(inputParams: GetAllRoomsParams): Promise<Room[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms`,
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

    async GetRoomById(roomId: number): Promise<Room> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/${roomId}`,
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

    async GetRoomByName(name: string): Promise<Room> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/n/${name}`,
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

    async Join(roomId: number): Promise<Room>{
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/${roomId}/players`,
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

    async JoinByName(roomName: string): Promise<Room>{
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/n/${roomName}/players`,
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


    async Leave(roomId: number): Promise<void> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/services/multiplayer/rooms/${roomId}/players`,
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