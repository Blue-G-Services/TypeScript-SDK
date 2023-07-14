import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import DynamicPixels from "../../../Sdk/DynamicPixels";
import styles from "../../../styles/Home.module.css";
import {Achievement} from "../../../Sdk/dto/achievement";

function AchievementPage() {
    const router = useRouter();

    const [achievements, setAchievement] = useState<Achievement[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await GetAchievements();
        })()
    }, []);

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
        <main className={styles.main}>
            <div className="container">
                <div className={styles.center} style={{alignItems: "normal"}}>
                    <h1>DynamicPixels</h1>
                    <h3>Achievements</h3>
                </div>

                <div className="row">
                    {achievements.map(achievement => <div className="col-sm-12 col-lg-3">
                        <div className="card">
                            <div className="card-body text-center">
                                <h4>{achievement.name}</h4>
                                <p>{achievement.desc}</p>
                                <table className="table">
                                    <tbody>
                                    {achievement.steps.map(step => <tr>
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
            </div>
        </main>
    </>)
}

export default AchievementPage;