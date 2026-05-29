import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../redux/auth/store";

export default function AuthGuard() {
    const token = useSelector(
        (state: RootState) => state.auth.accessToken
    );
    // const token = localStorage.getItem("accessToken");
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}