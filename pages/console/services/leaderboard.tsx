import {useEffect, useState} from "react";
import DynamicPixels from "../../../Sdk/DynamicPixels";
import 'bootstrap/dist/css/bootstrap.css'
import styles from "../../../styles/Home.module.css";
import {Leaderboard, PartyScore, UserScore} from "../../../Sdk/dto/leaderboard";
import {useRouter} from "next/router";

function LeaderboardsPage(){
    const router = useRouter();

    const [leaderboards, setLeaderboards] = useState<Leaderboard[]>([])
    const [selectedLeaderboard, setSelectedLeaderboard] = useState<Leaderboard>(new Leaderboard());
    const [scores, setScores] = useState<UserScore[] | PartyScore[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await getLeaderboards();
        })()
    }, [router]);

    async function getLeaderboards(){
        try {
            const list = await DynamicPixels.Services.Leaderboards.GetLeaderboards();
            console.log(list)
            setLeaderboards(list);
        } catch (err) {
            console.error(err)
        }
    }

    async function getLeaderboardScores(LeaderboardId: number, participent: number){
        try{
            if(participent === 0) {
                let scores = await DynamicPixels.Services.Leaderboards.GetUsersScores({
                    LeaderboardId,
                    Skip: 0,
                    Limit: 25
                });
                setScores(scores);
            }else {
                let scores = await DynamicPixels.Services.Leaderboards.GetPartiesScores({
                    LeaderboardId,
                    Skip: 0,
                    Limit: 25
                });
                setScores(scores);
            }

        }catch (e) {

        }
    }

    async function SelectLeaderboard(leaderboard: Leaderboard){
        setSelectedLeaderboard(leaderboard);
        await getLeaderboardScores(leaderboard.id, leaderboard.participants);
    }

    async function SubmitScore(e: any){
        e.preventDefault();
        const {score} = Object.fromEntries(
            new FormData(e.target).entries()
        );

        await DynamicPixels.Services.Leaderboards.SubmitScore({
            LeaderboardId: selectedLeaderboard.id,
            Score: parseInt(score as string)
        });
    }

    return <>
        <main className="container" style={{marginTop:40}}>
                <div className="row mb-3">
                    <h1>DynamicPixels</h1>
                    <h3>Leaderboards</h3>
                </div>

                <div className="row">
                    <div className="col col-sm-12 col-lg-4">
                        <div className="card">
                            <div className="card-header">
                                <h5>Leaderboards</h5>
                            </div>
                            <div className="card-body">
                                <div className="list-group list-group-flush">

                                {leaderboards.map(leaderboard => <a href="#!" key={`leaderboard-${leaderboard.id}`} className="list-group-item list-group-item-action" onClick={()=>SelectLeaderboard(leaderboard)}>
                                    <h6>{leaderboard.name}</h6>
                                    <small>{leaderboard.participants === 0 ? "Users":"Parties"}</small>
                                    -
                                    <small>{leaderboard.order === 0 && "Minimum"}</small>
                                    <small>{leaderboard.order === 1 && "Maximum"}</small>
                                    <small>{leaderboard.order === 2 && "Last Score"}</small>
                                    <small>{leaderboard.order === 3 && "Sum of scores"}</small>
                                </a>)}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card mb-3">
                            <div className="card-body">
                                <form className="row g-3" onSubmit={SubmitScore}>
                                    <div className="col">
                                        <input type="number" className="form-control" name="score" placeholder="Score"/>
                                    </div>

                                    <div className="col-auto">
                                        <button type="submit" className="btn btn-primary mb-3">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Score</th>
                                <th>Tries</th>
                                <th>Last Update</th>
                            </tr>
                            </thead>
                            <tbody>
                            {scores.map(score => <tr key={`score-${score.id}`}>
                                <td>{score.rank}</td>
                                <td>{score.name}</td>
                                <td>{score.value}</td>
                                <td>{score.tries}</td>
                                <td>{score.updated_at}</td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
        </main>
    </>
}

export default LeaderboardsPage;