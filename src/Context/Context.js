import { createContext, useContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({children}) =>{
    const [googleUser, setGoogleUser] = useState({});
    const [isLogin, setIsLogin] = useState(localStorage ?  JSON.parse(localStorage.getItem("isloggedin")) : false);
    const [auth, setAuth] = useState(null);
    return(
        <Context.Provider
            value={{
                setAuth,
                setGoogleUser,
                setIsLogin,
                googleUser,
                isLogin,
                auth
                
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(Context);
}
export { Context, ContextProvider};