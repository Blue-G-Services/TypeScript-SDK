import {Services} from "./services";

export class Query{

}

export class AggregationParams {
    public tableId: string = "";
}

export class FindParams {
    public tableId: string = "";
    public findOptions?: {
        query: Query,
        Skip: number,
        Limit: number
    };
}

export class FindByIdParams{
    public tableId:string="";
    public rowId:number = 0;
}

export class FindByIdAndDeleteParams{
    public tableId:string="";
    public rowId:number = 0;
}

export class FindByIdAndUpdateParams{
    public tableId:string="";
    public rowId:number = 0;
    public data: object = {};
}

export class InsertParams{
    public tableId:string="";
    public data: object = {};
}

export class InsertManyParams{
    public tableId:string="";
    public data: object[] = [];
}

export class UpdateManyParams {
    public tableId: string = "";
    public query: Query = {};
    public data: object = {};
}

export class DeleteParams{
    public tableId:string="";
    public rowsId:number[] = [];
}

export class DeleteManyParams {
    public tableId: string = "";
    public query: Query = {};
}

export interface ITable {
    Services: Services

    Aggregation<T extends AggregationParams>(input: T): Promise<object>;

    Find<T extends FindParams>(input: T): Promise<object[]>;

    FindById<T extends FindByIdParams>(input: T): Promise<object>;

    FindByIdAndDelete<T extends FindByIdAndDeleteParams>(input: T): Promise<object>;

    FindByIdAndUpdate<T extends FindByIdAndUpdateParams>(input: T): Promise<object>;

    Insert<T extends InsertParams>(input: T): Promise<object>;

    InsertMany<T extends InsertManyParams>(input: T): void;

    UpdateMany<T extends UpdateManyParams>(input: T): void;

    Delete<T extends DeleteParams>(input: T): Promise<object>;

    DeleteMany<T extends DeleteManyParams>(input: T): void;
}