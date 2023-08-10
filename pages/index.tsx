import DynamicPixels from "../Sdk/DynamicPixels";
import {LoginWithEmailParams} from "../Sdk/ports/authentication";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(()=>{

  }, [])
  
  const onLogin = async (e: any) => {
    e.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(e.target).entries()
    );

    try {
      setLoading(true);

      let result = await DynamicPixels.Auth.LoginWithEmail(
          new LoginWithEmailParams({
            email: email.toString(),
            password: password.toString(),
          })
      );

      localStorage.setItem("token", result.token);

      await router.push("/console/home")
    }catch (e) {

    }finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container">
        <div className="row" style={{marginTop:40}}>
        <div className="col-sm-12 text-center">
          <h1>DynamicPixels</h1>
          <h3>Login / Register</h3>
        </div>
          <div className="col-sm-12 col-lg-8 offset-lg-2 col-xl-4 offset-xl-4">
          <form className={styles.form} onSubmit={onLogin}>
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
              <Link href="/register">Register new account</Link>
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
        </div>
      </main>
    </>
  );
}