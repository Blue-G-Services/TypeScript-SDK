"use client"

import {useEffect, useState} from "react";
import DynamicPixels from "../../../lib/DynamicPixels";
import {Friendship} from "../../../lib/dto/friendship";

class Row {
    id: number = 0;
    name: string = "";
    image: string = "";
    desc: string = "";
    age: number = 0;
}
export default function SavePage() {

    const [rows, setRows] = useState<Row[]>([]);

    useEffect(() => {
        GetRows();
    }, []);

    const GetRows = async ()=>{
        let list = await DynamicPixels.Table.Find({
            findOptions: {
                skip: 0,
                limit: 100,
            },
            tableId: "64aadacd4ace593797fdf0f5"
        });

        setRows(list as Row[]);
    }

    return (
        <main>
            <div
                className="container justify-content-center align-items-center d-flex flex-column"
                style={{ maxHeight: "100vh" }}
            >
                <div className="row mb-5">
                    <div className="col-sm-12 text-center mb-3">
                        <h1>Table</h1>
                    </div>
                    <div className="col-sm-12 mb-3">
                        <form className="d-flex row g-3">
                            <div className="col-auto flex-fill">
                                <label className="visually-hidden">User ID</label>
                                <input type="text" className="form-control" name="user_id"/>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-3">Invite</button>
                            </div>
                        </form>
                        <table>
                            <tbody>
                            {rows.map(row => <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.desc}</td>
                                <td>{row.age}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </main>
    );
}