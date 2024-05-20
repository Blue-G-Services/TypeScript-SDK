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
        className="container justify-content-center align-items-center d-flex flex-column"
        style={{ height: "100vh" }}
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
                style={{background: "#EEE", borderRadius: 5, padding: 5}}
                className="d-flex justify-content-between align-items-center mb-2"
            >
              <span>{score.name}</span>

              <small>{score.value}</small>
            </div>)}
          </div>
        </div>
      </div>
    </main>
  );
}
