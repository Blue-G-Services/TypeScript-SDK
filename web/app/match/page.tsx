"use client"
import styles from "./styles.module.css";
import {useEffect, useState} from "react";
import DynamicPixels from "../../../lib/DynamicPixels";

export default function Match() {
    const [cells, setCells] = useState([{}, {}, {}, {}, {}, {}, {}, {}, {}])

    useEffect(() => {
        (async () => {
            await DynamicPixels.Services.MultiPlayer.RoomService.AutoMatch();
        })()
    }, []);

    return (
        <main>
            <div className="container justify-content-center align-items-center">
                <div className="row justify-content-center align-items-center" style={{height: "100vh"}}>
                    <div className="col-sm-12 col-md-8 col-lg-6">
                        <div className="row mb-3">
                            <div className={`col-6 ${styles.playerOneBox}`}>
                                <div className={styles.playerOneCircle}/>
                                <span>Parya</span>
                            </div>
                            <div className={`col-6 ${styles.playerTwoBox}`}>
                                <span>Arash</span>
                                <div className={styles.playerTwoCircle}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <div className={`row text-center ${styles.board}`}>
                                    {cells.map(cell => <div className="col-4 mb-3">
                                        <div className={`h-100 ${styles.cell}`}>
                                            .g-col-4
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}