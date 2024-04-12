import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DynamicPixels from "../../../sdk/DynamicPixels";
import styles from "../../../styles/Home.module.css";
import {Achievement} from "../../../sdk/dto/achievement";

function AchievementPage() {
    const router = useRouter();

    const [achievements, setAchievement] = useState<Achievement[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                await router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await GetAchievements();
        })()
    }, [router]);

    async function GetAchievements() {
        let achievements = await DynamicPixels.Services.Achievements.GetAchievements();
        setAchievement(achievements);
    }

    async function Unlock(achievementId: number, stepId: number){
        await DynamicPixels.Services.Achievements.UnlockAchievements({
            AchievementId: achievementId,
            StepId: stepId
        });
    }

    return (<>
        <main className="container" style={{marginTop:40}}>
            <div className="row mb-3">
                    <h1>DynamicPixels</h1>
                    <h3>Achievements</h3>
                </div>

                <div className="row">
                    {achievements.map(achievement => <div key={`achievement-${achievement.id}`} className="col-sm-12 col-lg-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4>{achievement.name}</h4>
                                <p>{achievement.desc}</p>
                                <table className="table">
                                    <tbody>
                                    {achievement.steps.map(step => <tr key={`${achievement.id}-step-${step.id}`}>
                                        <td>{step.name}</td>
                                        <td>{step.point}</td>
                                        <td>{
                                            step.unlocked
                                                ?
                                                <span className="badge">unlocked</span>
                                                :
                                                <button className="btn btn-primary" onClick={()=> Unlock(achievement.id, step.id)}>Unlock</button>
                                        }</td>
                                    </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>)}
                </div>
        </main>
    </>)
}

export default AchievementPage;