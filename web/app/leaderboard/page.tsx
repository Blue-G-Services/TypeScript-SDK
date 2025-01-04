"use client"
import {useEffect, useState} from "react";
import DynamicPixels from "../../../lib/DynamicPixels";
import {UserScore} from "../../../lib/dto/leaderboard";

export default function Leaderboard() {

  const [scores, setScores] = useState<UserScore[]>([]);

  useEffect(() => {
    GetScores();
  }, []);

  const GetScores = async ()=>{
    let scores = await DynamicPixels.Services.Leaderboards.GetUsersScores({
      LeaderboardId: 1, Limit: 15, Skip: 0
    })

    setScores(scores);
  }

  return (
    <main>
      <div
        className="container justify-content-center align-items-center d-flex flex-column mb-3" style={{marginTop:"3em"}}
      >
        <div className="row mb-5">
          <div className="col-sm-12 text-center mb-3">
            <h1>Leaderboard</h1>
          </div>
          <div
            className="col-sm-12"
            style={{ background: "#FAFAFA", borderRadius: 5, padding: 10 }}
          >
            {scores.map(score => <div
                style={{borderBottom: "1px solid #EEE"}}
                className="d-flex justify-content-between align-items-center mb-2 p5"
            >
              <h5>{score.name}</h5>
              <div>
                <span>{score.value} Score</span>
                <br/>
                <small>{score.tries} Try</small>
              </div>
            </div>)}
          </div>
        </div>
      </div>
    </main>
  );
}
