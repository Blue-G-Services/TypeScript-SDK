"use client"

import {FormEvent, FormEventHandler, useEffect, useState} from "react";
import DynamicPixels from "../../../lib/DynamicPixels";
import {Friendship} from "../../../lib/dto/friendship";

export default function FriendshipPage() {

    const [friends, setFriends] = useState<Friendship[]>([]);
    const [requests, setRequests] = useState<Friendship[]>([]);
    const [requesting, setRequesting] = useState<Friendship[]>([]);

    useEffect(() => {
        GetFriends();
        GetFriendsRequests();
        GetFriendsRequesting();
    }, []);

    const GetFriends = async ()=>{
        let friends = await DynamicPixels.Services.Friendship.GetMyFriends({
            limit: 100, skip: 0
        });

        setFriends(friends);
    }

    const GetFriendsRequests = async ()=>{
        let requests = await DynamicPixels.Services.Friendship.GetMyFriendshipRequests({
            limit: 100, skip: 0
        });

        setRequests(requests);
    }

    const GetFriendsRequesting = async ()=>{
        let requesting = await DynamicPixels.Services.Friendship.GetMyFriendshipRequesting({
            limit: 100, skip: 0
        });

        setRequesting(requesting);
    }

    const RequestFriendship = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {user_id} = Object.fromEntries(
            new FormData(e.currentTarget).entries()
        );

        await DynamicPixels.Services.Friendship.RequestFriendship({
            userId: parseInt(user_id as string)
        });

        await GetFriendsRequesting();
    }

    const DeleteFriendship = async (userID: number) => {
        await DynamicPixels.Services.Friendship.DeleteFriend({
            userId: userID
        });

        await GetFriends();
        await GetFriendsRequesting();
    }

    const AcceptFriendship = async (userID: number) => {
        await DynamicPixels.Services.Friendship.AcceptRequest({
            userId: userID
        });

        await GetFriends();
        await GetFriendsRequesting();
    }

    const RejectFriendship = async (userID: number) => {
        await DynamicPixels.Services.Friendship.RejectRequest({
            userId: userID
        });

        await GetFriends();
        await GetFriendsRequesting();
    }

    return (
        <main>
            <div
                className="container justify-content-center align-items-center d-flex flex-column mb-3" style={{marginTop:"3em"}}>
                <div className="row mb-5">
                    <div className="col-sm-12 text-center mb-3">
                        <h1>Friendship</h1>
                    </div>
                    <div className="col-sm-12 mb-3">
                        <form className="d-flex row g-3" onSubmit={RequestFriendship}>
                            <div className="col-auto flex-fill">
                                <label className="visually-hidden">User ID</label>
                                <input type="text" className="form-control" name="user_id"/>
                            </div>
                            <div className="col-auto">
                                <button type="submit" className="btn btn-primary mb-3">Invite</button>
                            </div>
                        </form>
                    </div>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="friends-tab" data-bs-toggle="tab"
                                    data-bs-target="#friends-tab-pane" type="button" role="tab"
                                    aria-controls="friends-tab-pane" aria-selected="true">Friends
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="requests-tab" data-bs-toggle="tab"
                                    data-bs-target="#requests-tab-pane" type="button" role="tab"
                                    aria-controls="requests-tab-pane" aria-selected="false">Requests
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="requestings-tab" data-bs-toggle="tab"
                                    data-bs-target="#requestings-tab-pane" type="button" role="tab"
                                    aria-controls="requestings-tab-pane" aria-selected="false">Requesting
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="friends-tab-pane" role="tabpanel" aria-labelledby="friends-tab" tabIndex="0">
                            {friends.map(item => <div
                                style={{borderBottom:"1px solid #eee", padding: 10}}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div className="d-flex align-items-center">
                                    <img src={item.image} style={{height:75, width:75, marginRight:7}}/>
                                    <div>
                                        <span>{item.name}</span>
                                        <br/>
                                        <small>{item.username}</small>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-danger" onClick={() => DeleteFriendship(item.id)}>Delete</button>
                            </div>)}
                        </div>
                        <div className="tab-pane fade" id="requests-tab-pane" role="tabpanel" aria-labelledby="requests-tab" tabIndex="1">
                            {requests.map(item => <div
                                style={{borderBottom: "1px solid #eee", padding: 10}}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div className="d-flex align-items-center">
                                    <img src={item.image} style={{height: 75, width: 75, marginRight: 7}}/>
                                    <div>
                                        <span>{item.name}</span>
                                        <br/>
                                        <small>{item.username}</small>
                                    </div>
                                </div>

                                <div>
                                    <button type="button" className="btn btn-danger" onClick={() => AcceptFriendship(item.id)}>Accept</button>
                                    <button type="button" className="btn btn-danger" onClick={() => RejectFriendship(item.id)}>Reject</button>
                                </div>
                            </div>)}
                        </div>
                        <div className="tab-pane fade" id="requestings-tab-pane" role="tabpanel" aria-labelledby="requestings-tab" tabIndex="2">
                            {requesting.map(item => <div
                                style={{borderBottom:"1px solid #eee", padding: 10}}
                                className="d-flex justify-content-between align-items-center mb-2"
                            >
                                <div className="d-flex align-items-center">
                                    <img src={item.image} style={{height:75, width:75, marginRight:7}}/>
                                    <div>
                                        <span>{item.name}</span>
                                        <br/>
                                        <small>{item.username}</small>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-danger" onClick={() => DeleteFriendship(item.id)}>Delete</button>
                            </div>)}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}