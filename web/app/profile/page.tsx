"use client"
import {useEffect, useState} from "react";
import {User} from "../../../lib/dto/user";
import DynamicPixels from "../../../lib/DynamicPixels";
import {useRouter} from "next/dist/client/components/navigation";

export default function Profile() {
    const router = useRouter()

    const [user, setUser] = useState<User>();

    useEffect(() => {
        GetUser();
    }, []);

    const GetUser = async () => {
        let user = await DynamicPixels.Services.Users.GetCurrentUser();
        setUser(user);
    }

    const Logout = async ()=>{
        DynamicPixels.Auth.Logout()
        await router.push("/");
    }

    return (
        <main>
            <div
                className="container justify-content-center align-items-center d-flex flex-column"
                style={{height: "100vh"}}
            >
                <div className="container">
                <div className="row mb-3 justify-content-between">
                    <img
                        src="https://randomuser.me/api/portraits/women/77.jpg"
                        className="rounded" alt="..."
                        style={{width:"30vw", borderRadius:10}}
                    />

                    <div>
                        <h5>{user?.name}</h5>
                        <span>{user?.username}</span>
                    </div>
                </div>
                    <div className="row mb-5">
                    <button className="btn btn-danger" onClick={Logout}>Logout</button>
                </div>
                </div>
            </div>
        </main>
    );
}
