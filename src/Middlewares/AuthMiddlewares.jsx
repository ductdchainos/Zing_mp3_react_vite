import { Navigate, Outlet } from "react-router-dom"; 

const isLogin = true;

const AuthMiddlewares = () => {
    return isLogin ? <Outlet/> : <Navigate to={"/login"}/>
}

export default AuthMiddlewares;
