import { Inter } from "@next/font/google";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import DynamicPixels from "../../Sdk/DynamicPixels";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (DynamicPixels.token == "")
      router.push("/");
  }, [])

  return (
      <>
        <main className={styles.main}>
          <div className={styles.center}>
            <h1>DynamicPixels</h1>
            <h3>TS-SDK</h3>
          </div>

          <div className="container">
          <div className="row g-2">
            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/leaderboard" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    Leaderboard <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    View a leaderboard's scores and submit a new score
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/achievement" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    Achievement <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    Track player's progress and reward them with prizes
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/chat" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    Chat <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    Chat with a group mate and test realtime comunication
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/friendship" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    FriendShip <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    See your friend and manage your requests
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/users" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    User <span> -&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    View your profile, edit it and look for new users
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/party" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    Party <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    Let people get together, talk, play and act as a team
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/storage" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    Storage <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    View your profile, edit it and look for new users
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-md-4 col-lg-3">
              <Link href="/console/services/devices" className="card shadow-lg p-3 mb-2 bg-body rounded">
                <div className="card-body">
                  <h2 className={inter.className}>
                    Devices <span>-&gt;</span>
                  </h2>
                  <p className={inter.className}>
                    see your connected device, and manage access of them
                  </p>
                </div>
              </Link>
            </div>
          </div>
          </div>
        </main>
      </>
  );
}
