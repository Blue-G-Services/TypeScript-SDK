import Meteor from "../Sdk/BlueG";
import {RegisterWithEmailParams} from "../Sdk/ports/authentication";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Register() {
    const onRegister = async (e: any) => {
        e.preventDefault();
        const { name, email, password } = Object.fromEntries(
            new FormData(e.target).entries()
        );

        let response = await Meteor.Auth.RegisterWithEmail(
            new RegisterWithEmailParams({
                name: name.toString(),
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
                    <form className={styles.form} onSubmit={onRegister}>
                        <div className={styles.input}>
                            <input type="text" name="name" placeholder="Name" required />
                        </div>
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
                            <Link href="..">Login with existing account</Link>
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
