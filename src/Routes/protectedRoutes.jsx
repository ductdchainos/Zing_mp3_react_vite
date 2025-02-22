import { Route } from "react-router-dom";
import Profile from "../Pages/Profile/Profile"
import AuthMiddlewares from "../Middlewares/AuthMiddlewares";
import Test from "../Pages/Test/Test";
import AdminMiddlewares from "../Middlewares/AdminMiddlewares";

export const protectedRoutes = (
    <>
        <Route path="ca-nhan" element={<AuthMiddlewares />}>
            <Route path="" element={<Profile />} />
            <Route path="ca-sy" element={<AdminMiddlewares />}>
                <Route path="" element={<Test />} />
            </Route>
        </Route>
    </>
);
