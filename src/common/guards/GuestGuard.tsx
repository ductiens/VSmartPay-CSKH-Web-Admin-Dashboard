import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../redux/auth/store";

export default function GuestGuard() {
  const token = useSelector(
    (state: RootState) => state.auth.accessToken
  );

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}