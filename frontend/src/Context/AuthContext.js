import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// Helper function to safely parse JSON
const safeJSONParse = (item) => {
    try {
        return JSON.parse(item);
    } catch (e) {
        return null;
    }
};

const INITIAL_STATE = {
    user: safeJSONParse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
};

/* Reads the data from the Provider and changes INITIAL_STATE */
export const AuthContext = createContext(INITIAL_STATE);

/* Children here are the Components that need to get the data. In this application, we specified the App component as a child in index.js so that we can serve every component that exists in the app */
/* This will provide data to all the children that we are giving here */
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        if (state.user !== null) {
            localStorage.setItem("user", JSON.stringify(state.user));
        }
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};