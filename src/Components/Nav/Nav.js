import { getAuth, signOut } from "@firebase/auth";
import { NavLink, useHistory } from "react-router-dom";
import { Context, useGlobalContext } from "../../Context/Context";

const Nav = () => {
    const { isLogin } = useGlobalContext(Context);
    const auth = getAuth();
    const history = useHistory();
    const handleSignOut = () => {
        return signOut(auth)
            .then((res) => {
                localStorage.clear();
                history.push("/login");
            })
            .catch((err) => {
                // An error happened.
            });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        TourHelper
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarSupportedContent"
                        // style={{ justifySelf: "end" }}
                    >
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/"
                                >
                                    Home
                                </NavLink>
                            </li>

                            {isLogin && (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to={`/bookings/${localStorage.getItem("id")}`}
                                        activeClassName="active"
                                    >
                                       Bookings
                                    </NavLink>
                                </li>
                            )}
                            {isLogin && (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/bookings"
                                        activeClassName="active"
                                    >
                                       Manage all Bookings
                                    </NavLink>
                                </li>
                            )}
                            {isLogin && (
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link"
                                        to="/addService"
                                        activeClassName="active"
                                    >
                                       Add new packages
                                    </NavLink>
                                </li>
                            )}
                            <li className="nav-item">
                                {isLogin ? (
                                    <button
                                        className="btn btn-danger"
                                        onClick={handleSignOut}
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <NavLink
                                        to="/login"
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </NavLink>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
