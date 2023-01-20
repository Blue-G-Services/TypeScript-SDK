import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Meteor from "../Sdk/BlueG";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1>Meteor JS-SDK</h1>
        </div>
        <div className={styles.grid}>
          <Link href="/services/leaderboard" className={styles.card}>
            <h2 className={inter.className}>
              Leaderboard <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              View a leaderboard's scores and submit a new score
            </p>
          </Link>

          <Link href="/services/chat" className={styles.card}>
            <h2 className={inter.className}>
              Chat <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Chat with a group mate and test realtime comunication
            </p>
          </Link>

          <Link href="/services/friendship" className={styles.card}>
            <h2 className={inter.className}>
              FriendShip <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              See your friend, Request friendship and manage your requests
            </p>
          </Link>

          <Link href="/services/users" className={styles.card}>
            <h2 className={inter.className}>
              User <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              View your profile, edit it and look for new users
            </p>
          </Link>

          <Link href="/services/party" className={styles.card}>
            <h2 className={inter.className}>
              Party <span>-&gt;</span>
            </h2>
            <p className={inter.className}></p>
          </Link>

          <Link href="/services/storage" className={styles.card}>
            <h2 className={inter.className}>
              Storage <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              View your profile, edit it and look for new users
            </p>
          </Link>

          <Link href="/services/devices" className={styles.card}>
            <h2 className={inter.className}>
              Devices <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              see your connected device, and manage access of them
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  let user = await Meteor.Table.Services.Users.GetCurrentUser();
  console.log(user)
  return {
    props: {},
  }
}