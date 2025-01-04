"use client"
import DynamicPixels from "../../lib/DynamicPixels";
import {useEffect} from "react";
import {useRouter} from "@/node_modules/next/dist/client/components/navigation";

export default function Home() {
    const router = useRouter()

    useEffect(()=>{
        DynamicPixels.Setup("im49q2", "ijm6qtxpob9l8jq13oe7ca", false);
    })

    const onSubmit = async (e: any)=>{
        e.preventDefault();

        const {email, password} = Object.fromEntries(
            new FormData(e.target).entries()
        );

        let cred = await DynamicPixels.Auth.LoginWithEmail({
            email: email as string,
            password: password as string,
        });

        // cred.
        router.push("/menu");
    }

    const onGuestLogin = async ()=>{
        await DynamicPixels.Auth.LoginAsGuest({
            device_info: {device_id:"123456789"}
        });

        await router.push("/menu");
    }

    return (
        <main>
            <div className="container justify-content-center align-items-center d-flex flex-column mb-5" style={{marginTop:"3em"}}>
                <div className="row mb-5">
                    <div className="col-sm-12 mb-5 text-center">
                        <h1>TicTocToe</h1>
                        <span>An example game based on Typescript SDK</span>
                    </div>

                        <div className="col-sm-12">
                            <div className="d-grid gap-2 mb-2">
                                <form onSubmit={onSubmit}>
                                    <div className="form-group mb-3">
                                        <label>Email address</label>
                                        <input type="email" className="form-control" name="email"
                                               placeholder="Enter email"/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password"
                                               placeholder="Password"/>
                                    </div>
                                    <div className="form-group d-grid gap-2">
                                        <button className="btn btn-primary" type="submit">
                                            Login
                                        </button>
                                    </div>
                                </form>

                                {/*<div className="form-group mb-3 d-grid gap-2">*/}
                                {/*    <button className="btn btn-primary">*/}
                                {/*        Login with Google*/}
                                {/*    </button>*/}
                                {/*</div>*/}
                                <div className="form-group mb-3 d-grid gap-2" onClick={onGuestLogin}>
                                    <button className="btn btn-primary">
                                        Login as Guest
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </main>
    );
}
