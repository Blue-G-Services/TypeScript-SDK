import {Services} from "./services";

export class Query{

}

export class JoinParams{
    public table_name: string = "";
    public local_field: string = "";
    public foreign_field: string = "";
}

export class FindParams {
    public tableId: string = "";
    public findOptions?: {
        conditions?: Query ,
        joins?: JoinParams[];
        select?: string[] ;
        sorts?: { string: string }
        skip: number,
        limit: number
    } = {
        skip: 0,
        limit: 25
    };
}

export class FindByIdParams{
    public tableId:string="";
    public rowId:number = 0;
}

export class FindOneParams{
    public tableId:string="";
    public conditions: Query | undefined;
    public joins: JoinParams[] = [];
}

export class FindOneAndDeleteParams{
    public tableId:string="";
    public conditions: Query | undefined;
    public joins: JoinParams[] = [];
    public select: string[] = [];}

export class FindOneAndUpdateParams{
    public tableId:string="";
    public conditions: Query | undefined;
    public joins: JoinParams[] = [];
    public select: string[] = [];
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

export class UpdateParams {
    public tableId: string = "";
    public rowId: string = "";
    public data: object = {};
}

export class UpdateManyParams {
    public tableId: string = "";
    public conditions: Query = {};
    public data: object = {};
}

export class DeleteByIDParams{
    public tableId: string = "";
    public rowsId: number= 0;
}

export class DeleteByIDsParams{
    public tableId:string="";
    public ids:number[] = [];
}

export class DeleteManyParams {
    public tableId: string = "";
    public conditions: Query = {};
}

export interface ITable {
    Find<T extends FindParams>(input: T): Promise<object[]>;

    FindById<T extends FindByIdParams>(input: T): Promise<object>;

    FindOne<T extends FindOneParams>(input: T): Promise<object>;

    FindOneAndDelete<T extends FindOneAndDeleteParams>(input: T): Promise<object>;

    FindOneAndUpdate<T extends FindOneAndUpdateParams>(input: T): Promise<object>;

    Insert<T extends InsertParams>(input: T): Promise<object>;

    InsertMany<T extends InsertManyParams>(input: T): void;

    Update<T extends UpdateParams>(input: T): void;

    UpdateMany<T extends UpdateManyParams>(input: T): void;

    DeleteByID<T extends DeleteByIDParams>(input: T): Promise<object>;

    DeleteByIDs<T extends DeleteByIDsParams>(input: T): Promise<object>;

    DeleteMany<T extends DeleteManyParams>(input: T): void;
}