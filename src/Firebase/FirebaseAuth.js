import firebase from "firebase/compat/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import firebaseConfig from "./Firebase.config";
import { Context, useGlobalContext } from "../Context/Context";
import { useLocation, useHistory } from "react-router-dom";
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const FirebaseAuth = () => {
    const location = useLocation();
    const history = useHistory();
    const {from}  = location.state || { from: { pathname: "/" } };
    const { setIsLogin } = useGlobalContext(Context);
    const auth = getAuth();
    // setAuth(auth);
    const googleProvider = new GoogleAuthProvider();
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        isLoggedIn: false,
    });
    // google sing in start
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const userInfo = { ...user };
                userInfo.email = user.email;
                userInfo.success = true;
                userInfo.isLoggedIn = true;
                setIsLogin(true);
                setUser(userInfo);
                localStorage.setItem("email", result.user.email);
                localStorage.setItem("id", result.user.uid);
                localStorage.setItem("name", result.user.displayName);
                localStorage.setItem("isloggedin", "true");
                history.push(from);
            })
            .catch((error) => {
                const userInfo = { ...user };
                userInfo.error = error.message;
                setUser(userInfo);
            });
    };
    // google sing in end
    const handleSubmit = (e) => {
        if (newUser && user.password && user.email) {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    // console.log(res.user);
                    const userInfo = { ...user };
                    userInfo.success = true;
                    userInfo.isLoggedIn = true;
                    userInfo.email = res.user.email;
                    setUser(userInfo);
                })
                .catch((error) => {
                    // console.log(error.message);
                    const userInfo = { ...user };
                    userInfo.success = false;
                    userInfo.isLoggedIn = false;
                    userInfo.error = error.message;
                    setUser(userInfo);
                });
        }
        if (!newUser) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((res) => {
                    // console.log("signin", res.user);
                    const userInfo = { ...user };
                    userInfo.success = true;
                    userInfo.isLoggedIn = true;
                    setIsLogin(true);
                    localStorage.setItem("email", res.user.email);
                    localStorage.setItem("id", res.user.uid);
                    localStorage.setItem("name", res.user.displayName);
                    localStorage.setItem("isloggedin", "true");
                    userInfo.email = res.user.email;
                    setUser(userInfo);
                    history.push(from);
                })
                .catch((error) => {
                    // console.log(error.message);
                    const userInfo = { ...user };
                    userInfo.success = false;
                    userInfo.isLoggedIn = false;
                    userInfo.error = error.message;
                    setUser(userInfo);
                });
        }
        e.preventDefault();
    };

    // sign up using email password start
    const handleOnBlur = (e) => {
        let isValid = true;
        if (e.target.name === "email") {
            isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === "password") {
            isValid = /\d/.test(e.target.value) && e.target.value.length > 6;
        }
        if (isValid) {
            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
    };
    
    // const currentUser = auth.currentUser;
    // if (currentUser) return history.push("/")
    // else
        return (
            <div className="container">
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="text-center">
                        {newUser ? "Sign Up" : "Log In"}
                    </h1>
                    {user.success || (
                        <div style={{ color: "red" }}>{user.error}</div>
                    )}
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            onBlur={handleOnBlur}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Your email address"
                            name="email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="exampleFormControlInput2"
                            className="form-label"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            onBlur={handleOnBlur}
                            className="form-control"
                            id="exampleFormControlInput2"
                            placeholder="Your password"
                            name="password"
                            required
                        />
                    </div>
                    <input
                        type="submit"
                        value={newUser ? "SUBMIT" : "LOGIN"}
                        className="btn btn-secondary w-100 form-btn"
                    />
                </form>
                <div className="text-center pt-5">
                    <h5 className="text-muted pb-4">Or Sign Up Using</h5>
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-dark"
                    >
                        Sign in google
                    </button>
                </div>
                <div className="text-center pt-5">
                    <h5 className="text-muted pb-4">
                        {!newUser
                            ? "Are you new here? First SIGN UP"
                            : "Have an account already? Please, LOGIN"}
                    </h5>
                    <span
                        className="toggle-signUp-logIn fw-bold btn btn-primary"
                        onClick={() => setNewUser(!newUser)}
                    >
                        {!newUser ? "SIGN UP" : "LOGIN"}
                    </span>
                </div>
            </div>
        );
};

export default FirebaseAuth;
