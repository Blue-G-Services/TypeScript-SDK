import styles from "../../../styles/Home.module.css";
import {ChangeEvent, ChangeEventHandler, useEffect, useState} from "react";
import DynamicPixels from "../../../Sdk/DynamicPixels";
import {User} from "../../../Sdk/dto/user";
import {useRouter} from "next/router";

function UsersPage(){
    const router = useRouter();

    const [playerId, setPlayerId] = useState(0);
    const [query, setQuery] = useState("");
    const [user, setUser] = useState<User>(new User());
    const [list, setList] = useState<User[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await getUserById();
        })()
    },[]);

    async function findUsers(e: ChangeEvent<{ value: string }>){
        setQuery(e.currentTarget.value);

        if(e.currentTarget.value.length > 1) {
            let users = await DynamicPixels.Services.Users.FindUsers({
                query: new Map<string, string>([
                    ["name", e.currentTarget.value]
                ])
            });

            setList(users);
        }
    }

    async function getUserById(){
        let user;
        if(playerId)
            user = await DynamicPixels.Services.Users.GetUserById({
                userId: playerId
            });
        else
            user = await DynamicPixels.Services.Users.GetCurrentUser();

        console.log(user)
        setUser(user);
    }

    return <>
        <main className={styles.main}>
            <div className="container">
                <div className={styles.center} style={{alignItems:"normal"}}>
                    <h1>DynamicPixels</h1>
                    <h3>Users</h3>
                </div>

                <div className="row">
                    <div className="col col-sm-12 col-lg-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <input type="number" className="form-control" placeholder="Player Id" value={playerId} onChange={e => setPlayerId(parseInt(e.target.value))}/>
                            </div>
                            <div className="card-footer">
                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary" onClick={getUserById}>Find</button>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h5>Current User</h5>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>Name:</td>
                                            <td>{user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone Number:</td>
                                            <td>{user.phone_number}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>First Login:</td>
                                            <td>{user.first_login}</td>
                                        </tr>
                                        <tr>
                                            <td>Last Login:</td>
                                            <td>{user.last_login}</td>
                                        </tr>
                                        <tr>
                                            <td>Is Ban:</td>
                                            <td>{user.is_ban && "true"}</td>
                                        </tr>
                                        <tr>
                                            <td>Is Tester:</td>
                                            <td>{user.is_tester && "true"}</td>
                                        </tr>
                                        <tr>
                                            <td>Is Guest:</td>
                                            <td>{user.is_guest && "true"}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card mb-3">
                            <div className="card-body">
                                <input type="text" className="form-control" placeholder="User's name" value={query} onChange={findUsers}/>
                            </div>
                        </div>

                        {list.map(user => <div className="card mb-3">
                            <div className="card-body">
                                <img src={user.image} style={{borderRadius:'50%', height:40, width:40}}/>
                                <span>{user.name}</span>
                            </div>
                        </div>)}

                    </div>
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

export default UsersPage;