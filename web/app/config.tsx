'use client'

import {useMemo} from "react";
import DynamicPixels from "../../lib/DynamicPixels";

export default function Config(){
    useMemo(() => {
        console.log("Initializing DynamicPixels")
        DynamicPixels.Setup("im49q2", "ijm6qtxpob9l8jq13oe7ca", false);

        (async () => {
            if (localStorage.getItem("token")) {
                let cred = await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") as string
                });

                console.log({newCred: cred});
            }
        })()
        return true;
    }, []);

    return <></>
}