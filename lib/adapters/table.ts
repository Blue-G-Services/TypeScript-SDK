import {
    DeleteByIDParams, DeleteByIDsParams,
    DeleteManyParams,
    FindByIdParams, FindOneAndDeleteParams, FindOneAndUpdateParams, FindOneParams,
    FindParams, InsertManyParams, InsertParams,
    ITable, UpdateManyParams, UpdateParams
} from "../ports/table";
import axios from "axios";
import DynamicPixels from "../DynamicPixels";

export class Table implements ITable {

    async Find<T extends FindParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}?skip=${input.findOptions?.skip}&limit=${input.findOptions?.limit}`,
                {
                    conditions: input.findOptions?.conditions,
                    sorts: input.findOptions?.sorts,
                    joins: input.findOptions?.joins,
                    select: input.findOptions?.select,
                },{
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data.list;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async FindById<T extends FindByIdParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/${input.rowId}`,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async FindOne<T extends FindOneParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/find-one`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async FindOneAndDelete<T extends FindOneAndDeleteParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/find-one-and-delete`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async FindOneAndUpdate<T extends FindOneAndUpdateParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/find-one-and-update`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async Insert<T extends InsertParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data;
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async InsertMany<T extends InsertManyParams>(input: T): Promise<void> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/insert`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async Update<T extends UpdateParams>(input: T): Promise<void> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/${input.rowId}`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async UpdateMany<T extends UpdateManyParams>(input: T): Promise<void> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/update`,
                input,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async DeleteByID<T extends DeleteByIDParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/delete`,
                {ids: [input.rowsId]},
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async DeleteByIDs<T extends DeleteByIDsParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/delete`,
                {ids: input.ids},
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async DeleteMany<T extends DeleteManyParams>(input: T): Promise<void> {
        try {
            let {data} = await axios.put(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/delete`,
                {conditions: input.conditions},
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

            return data
        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

}