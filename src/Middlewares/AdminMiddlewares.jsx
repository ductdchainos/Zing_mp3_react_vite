import { Navigate, Outlet } from "react-router-dom"; 

const isAdmin = false;

const AdminMiddlewares = () => {
    return isAdmin ? <Outlet/> : <Navigate to={"/login"}/>
}

export default AdminMiddlewares;
