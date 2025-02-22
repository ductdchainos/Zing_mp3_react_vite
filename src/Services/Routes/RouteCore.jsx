import { Routes } from "react-router-dom";
import { publicRoutes } from "../../Routes/publicRoutes";
import { protectedRoutes } from "../../Routes/protectedRoutes";
const RouteCore = () => {
    return (
        <Routes >
            {publicRoutes}
            {protectedRoutes}
        </Routes>
    );
}

export default RouteCore;
