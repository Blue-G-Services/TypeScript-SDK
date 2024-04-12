import {
    AggregationParams,
    DeleteManyParams,
    DeleteParams,
    FindByIdAndDeleteParams, FindByIdAndUpdateParams,
    FindByIdParams,
    FindParams, InsertManyParams, InsertParams,
    ITable, UpdateManyParams
} from "../ports/table";
import axios from "axios";
import DynamicPixels from "../DynamicPixels";

export class Table implements ITable {

    Aggregation<T extends AggregationParams>(input: T): Promise<object> {
        return Promise.resolve({undefined});
    }

    async Delete<T extends DeleteParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/delete`,
                {ids: input.rowsId},
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
                {conditions: input.query},
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

    async Find<T extends FindParams>(input: T): Promise<object[]> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}?skip=${input.findOptions?.Skip}&limit=${input.findOptions?.Limit}`,
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

    async FindByIdAndDelete<T extends FindByIdAndDeleteParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.delete(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/${input.rowId}`,
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

    async FindByIdAndUpdate<T extends FindByIdAndUpdateParams>(input: T): Promise<object> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/table/${input.tableId}/${input.rowId}`,
                input.data,
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
                input.data,
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
                input.data,
                {
                    headers: {
                        "Authorization": `bearer ${DynamicPixels.token}`
                    }
                });

        } catch (e: any) {
            throw new Error(e.response.data)
        }
    }

    async UpdateMany<T extends UpdateManyParams>(input: T): Promise<void> {

    }
}