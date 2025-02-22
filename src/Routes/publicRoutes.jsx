import { Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Categories from "../Pages/Categories/Categories";
export const publicRoutes = (
    <>
        <Route path="/" element={<Home />} />
        <Route path="/the-loai" element={<Categories />} />
    </>
);
