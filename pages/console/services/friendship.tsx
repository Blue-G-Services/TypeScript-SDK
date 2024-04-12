import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DynamicPixels from "../../../sdk/DynamicPixels";
import styles from "../../../styles/Home.module.css";
import {Friendship} from "../../../sdk/dto/friendship";

function FriendshipPage() {
    const router = useRouter();

    const [friends, setFriends] = useState<Friendship[]>([]);
    const [requests, setRequests] = useState<Friendship[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await GetFriends();
            await GetRequests();
        })()
    },[router]);

    async function GetRequests(){
        let requests = await DynamicPixels.Services.Friendship.GetMyFriendshipRequests({
            skip: 0,
            limit: 25
        });

        setRequests(requests);
    }
    async function GetFriends(){
        let friends = await DynamicPixels.Services.Friendship.GetMyFriends({
            skip: 0,
            limit: 25
        });

        setFriends(friends);
    }

    async function SendRequest(e:any){
        e.preventDefault();

        const { player_id } = Object.fromEntries(
            new FormData(e.target).entries()
        );
        if (!player_id) return

        await DynamicPixels.Services.Friendship.RequestFriendship({
            userId: parseInt(player_id as string)
        });

        await GetRequests();
    }

    return( <>
        <main className="container" style={{marginTop:40}}>
            <div className="row mb-3">
                    <h1>DynamicPixels</h1>
                    <h3>Friendship</h3>
                </div>

                <div className="row">
                    <div className="col col-sm-12 col-lg-4">

                        <div className="card">
                            <div className="card-header">
                                <h5>Your requests</h5>
                            </div>
                            <div className="card-body">
                                <form className="row g-3" onSubmit={SendRequest}>
                                    <div className="col-auto">
                                        <input type="number" className="form-control" name="player_id" placeholder="Player Id"/>
                                    </div>
                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-primary mb-3">Send</button>
                                    </div>
                                </form>
                                <div className="list-group list-group-flush">
                                    {requests.map(friend => <a href="#!" key={`friend-${friend.id}`} className="list-group-item list-group-item-action">
                                        <h6>{friend.name}</h6>
                                    </a>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-sm-12 col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>Your friends</h5>
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush">
                                    {friends.map(friend => <a href="#!" key={`friend-${friend.id}`} className="list-group-item list-group-item-action">
                                        <h6>{friend.name}</h6>
                                    </a>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </main>
    </>)
}

export default FriendshipPage;