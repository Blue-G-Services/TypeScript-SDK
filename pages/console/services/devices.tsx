import styles from "../../../styles/Home.module.css";
import {useEffect, useState} from "react";
import { Device } from "../../../Sdk/dto/device";
import DynamicPixels from "../../../Sdk/DynamicPixels";
import router from "next/router";

function DevicesPage(){

    const [list, setList] = useState<Device[]>([]);

    useEffect(()=>{
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await getDevices();
        })()
    },[])

    async function getDevices(){
        let devices = await DynamicPixels.Services.Devices.GetMyDevices();
        setList(devices);
    }

    return <>
        <main className="container" style={{marginTop:40}}>
            <div className="row mb-3">
                    <h1>DynamicPixels</h1>
                    <h3>Devices</h3>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-6 offset-lg-3">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        </main>
    </>
}

export async function getStaticProps() {
  
    return {
      props: {},
    }
}

export default DevicesPage;