import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DynamicPixels from "../../../Sdk/DynamicPixels";
import styles from "../../../styles/Home.module.css";
import {Friendship} from "../../../Sdk/dto/friendship";

function FriendshipPage() {
    const router = useRouter();

    const [friends, setFriends] = useState<Friendship[]>([]);
    const [requests, setRequests] = useState<Friendship[]>([]);

    useEffect(() => {
        if (DynamicPixels.token == "")
            router.push("/");

        GetFriends();
    },[]);

    async function GetFriends(){
        let friends = await DynamicPixels.Services.Friendship.GetMyFriends({
            skip: 0,
            limit: 25
        });

        setFriends(friends);
    }

    async function SendRequest(e:any){
        e.preventDefault();
        const {player_id} = Object.fromEntries(
            new FormData(e.target).entries()
        );

        await DynamicPixels.Services.Friendship.RequestFriendship({
            targetUserId: parseInt(player_id as string)
        });
    }

    return( <>
        <main className={styles.main}>
            <div className="container">
                <div className={styles.center} style={{alignItems:"normal"}}>
                    <h1>DynamicPixels</h1>
                    <h3>Friendship</h3>
                </div>

                <div className="row">
                    <div className="col col-sm-12 col-lg-4">
                        <h4>Your requests</h4>
                        <form className="row g-3" onClick={SendRequest}>
                            <div className="col-auto">
                                <input type="number" className="form-control" name="player_id" placeholder="Player Id"/>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-3">Send</button>
                            </div>
                        </form>
                    </div>
                    <div className="col col-sm-12 col-lg-4">
                        <h4>Incoming requests</h4>

                    </div>
                    <div className="col col-sm-12 col-lg-4">
                        <h4>Your friends</h4>

                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default FriendshipPage;