import DynamicPixels from "../sdk/DynamicPixels";
import {RegisterWithEmailParams} from "../sdk/ports/authentication";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/router";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onRegister = async (e: any) => {
        e.preventDefault();
        const { name, email, password } = Object.fromEntries(
            new FormData(e.target).entries()
        );

        try {
            setLoading(true)
            let response = await DynamicPixels.Auth.RegisterWithEmail(
                new RegisterWithEmailParams({
                    name: name.toString(),
                    email: email.toString(),
                    password: password.toString(),
                })
            );
            await router.push("/console/home")
        }catch (e) {

        }finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className={styles.main}>
                <div className={styles.center}>
                    <h1>DynamicPixels</h1>
                    <h3>Login / Register</h3>
                </div>
                <div className={styles.gridcenter}>
                    <form className={styles.form} onSubmit={onRegister}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" placeholder="Name" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="text" className="form-control" name="email" placeholder="Email" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className={styles.input}>
                            <Link href="..">Login with existing account</Link>
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-success">
                                {loading
                                    ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    :
                                    "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps() {
    DynamicPixels._clientId = "";
    DynamicPixels._clientSecret = "";

    return {
        props: {},
    };
}
