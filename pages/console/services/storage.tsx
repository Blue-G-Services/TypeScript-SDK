import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import DynamicPixels from "../../../sdk/DynamicPixels";
import styles from "../../../styles/Home.module.css";
// @ts-ignore
import {FileInfo} from "../../../sdk/dto/storage";

function StoragePage(){
    const router = useRouter();

    const [fileName, setFileName] = useState("");
    const[selectedFileInfo, setSelectedFileInfo] = useState<FileInfo>(new FileInfo());

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

        })()
    });

    async function GetInfo(){
        let info = await DynamicPixels.Storage.GetFileInfo(fileName);
        setSelectedFileInfo(info);
    }

    async function DownloadFile(){
        await DynamicPixels.Storage.Download(fileName, "./");
    }

    return <>
        <main className="container" style={{marginTop:40}}>
                <div className={styles.center} style={{alignItems: "normal"}}>
                    <h1>DynamicPixels</h1>
                    <h3>Storage</h3>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-4 offset-lg-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <input type="text" className="form-control mb-3" placeholder="File name" value={fileName} onChange={(e)=>setFileName(e.currentTarget.value)}/>
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" onClick={GetInfo}>Get Info</button>
                                    <button className="btn btn-primary" onClick={DownloadFile}>Download</button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </div>
        </main>
    </>
}

export default StoragePage;