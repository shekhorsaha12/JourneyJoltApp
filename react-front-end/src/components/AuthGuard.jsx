import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
    const isAuthenticated = localStorage.getItem("token") ? true : false;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
