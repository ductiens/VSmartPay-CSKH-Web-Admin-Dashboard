import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazyWithRetry } from "../common/utils/lazyWithRetry";
import LoadingPage from "../features/loading-page/LoadingPage";
import PageNotFound from "../features/page-not-found/PageNotFound";
import GuestGuard from "../common/guards/GuestGuard";
import AuthGuard from "../common/guards/AuthGuard";

const LoginPage = lazyWithRetry(() => import("../features/login/LoginPage"));

const routes = [
  {
    element: <AuthGuard></AuthGuard>,
    children: [
      {
        path: "/",
        element: <>ádasd</>,
      },
    ],
  },
  {
    element: <GuestGuard></GuestGuard>,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingPage />}>
        <PageNotFound />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(routes);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
