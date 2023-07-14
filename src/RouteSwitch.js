import { Routes, Route } from "react-router-dom";
import Store from "./components/Store";

const RouteSwitch = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Store />}></Route>
                <Route path="/store" element={<Store />}></Route>
            </Routes>
        </>
    );
};

export default RouteSwitch;
