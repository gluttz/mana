import "./styles/App.css";
import { useState, createContext, useMemo } from "react";
import RouteSwitch from "./RouteSwitch";
import Header from "./components/Header";
import gnome from "./assets/images/gnome.jpg";
import AppProvider from "./AppProvider";

const App = () => {
    return (
        <>
            <AppProvider>
                <Header />
                <RouteSwitch />
            </AppProvider>
        </>
    );
};

export default App;
