import "./styles/App.css";
import { useState, createContext, useContext, useMemo } from "react";
import RouteSwitch from "./RouteSwitch";
import Header from "./components/Header";
import gnome from "./assets/images/gnome.jpg";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(true);
    const [user, setUser] = useState({
        name: "gluttz",
        avatar: gnome,
        balance: 23.49,
    });

    const contextValue = useMemo(
        () => ({ user, isDarkTheme, setUser, setIsDarkTheme }),
        [user, isDarkTheme, setUser, setIsDarkTheme]
    );
    return (
        <>
            <AppContext.Provider value={contextValue}>
                {children}
            </AppContext.Provider>
        </>
    );
};

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("App components must be within AppProvider");
    }
    return context;
}
export default AppProvider;
