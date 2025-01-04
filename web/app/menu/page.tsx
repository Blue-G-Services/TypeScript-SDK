import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container text-center justify-content-center align-items-center d-flex flex-column mb-5" style={{marginTop:"3em"}}>
        <div className="row mb-5">
          <div className="col-sm-12 mb-5">
            <h1>TicTocToe</h1>
            <span>An example game based on Typescript SDK</span>
          </div>

          <div className="col-sm-12">
            <div className="d-grid gap-2 mb-2">
              <button type="button" className="btn btn-success">
                Start a Match
              </button>
            </div>
            <div className="d-grid gap-2 mb-2">
              <Link
                  href="/leaderboard"
                  type="button"
                  className="btn btn-success"
              >
                Leaderboard
              </Link>
            </div>
            <div className="d-grid gap-2 mb-2">
              <Link
                  href="/table"
                  type="button"
                  className="btn btn-success"
              >
                Table
              </Link>
            </div>
            <div className="d-grid gap-2 mb-2">
              <Link
                  href="/party"
                  type="button"
                  className="btn btn-success"
              >
                Party
              </Link>
            </div>
            <div className="d-grid gap-2 mb-2">
              <Link
                  href="/friendship"
                  type="button"
                  className="btn btn-success"
              >
                Friendship
              </Link>
            </div>
            <div className="d-grid gap-2 mb-5">
              <Link href="/profile" type="button" className="btn btn-success">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
