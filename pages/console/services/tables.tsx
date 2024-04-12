import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import DynamicPixels from "../../../sdk/DynamicPixels";
import {Party} from "../../../sdk/dto/party";

function TablesPage() {
    const router = useRouter();

    const [list, setList] = useState<Party[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })


        })()
    }, [router]);

    return <>
        <main className="container" style={{marginTop:40}}>
            <div className="row mb-3">
                <h1>DynamicPixels</h1>
                <h3>Tables</h3>
            </div>

            <div className="row">

            </div>
        </main>
    </>
}

export default TablesPage;
