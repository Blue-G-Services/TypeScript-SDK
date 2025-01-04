"use client"
import {useEffect, useState} from "react";
import {User} from "../../../lib/dto/user";
import DynamicPixels from "../../../lib/DynamicPixels";
import { useRouter } from 'next/navigation';

export default function Profile() {
    const router = useRouter()

    const [user, setUser] = useState<User>({
        name: "Parya",
        username:"logicalangel"
    } as User);

    useEffect(() => {
        GetUser();
    }, []);

    const GetUser = async () => {
        let user = await DynamicPixels.Services.Users.GetCurrentUser();
        setUser(user);
    }

    const Logout = async () => {
        DynamicPixels.Auth.Logout()
        await router.push("/");
    }

    return (
        <main>
            <div className="container justify-content-center align-items-center d-flex flex-column mb-5" style={{marginTop:"3em"}}>
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-sm-12 col-lg-6 offset-lg-3">
                            <div className="col-sm-12 text-center">
                                <img
                                    src="https://randomuser.me/api/portraits/women/77.jpg"
                                    alt="profile image" className="mb-1"
                                    style={{width: "150px", borderRadius:"50%", clear:"both"}}
                                />
                                    <h4>{user?.name}</h4>
                                    <span>{user?.username}</span>
                            </div>
                            <hr/>
                            <div className="row mb-5">
                                <button className="btn btn-danger" onClick={Logout}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
