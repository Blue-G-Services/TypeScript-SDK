import Meteor from "../Sdk/BlueG";
import {LoginWithEmailParams} from "../Sdk/ports/authentication";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Login() {

  const onLogin = async (e: any) => {
    e.preventDefault();
    console.log("hop")
    const { email, password } = Object.fromEntries(
      new FormData(e.target).entries()
    );

    let response = await Meteor.Auth.LoginWithEmail(
      new LoginWithEmailParams({
        email: email.toString(),
        password: password.toString(),
      })
    );
  };

  return (
    <>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1>Login/Register</h1>
        </div>
        <div className={styles.gridcenter}>
          <form className={styles.form} onSubmit={onLogin}>
            <div className={styles.input}>
              <input type="text" name="email" placeholder="Email" required />
            </div>

            <div className={styles.input}>
              <input
                type="text"
                name="password"
                placeholder="Password"
                required
              />
            </div>

            <div className={styles.input}>
              <Link href="/register">Register new account</Link>
            </div>
            <div className={styles.input}>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  Meteor._clientId = "";
  Meteor._clientSecret = "";

  return {
    props: {},
  };
}
