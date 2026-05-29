import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthGuard from "../common/guards/AuthGuard";
import GuestGuard from "../common/guards/GuestGuard";
import { lazyWithRetry } from "../common/utils/lazyWithRetry";
import LoadingPage from "../features/loading-page/LoadingPage";
import PageNotFound from "../features/page-not-found/PageNotFound";




const LoginPage = lazyWithRetry(() => import("../features/login/LoginPage"));
const DashboardPage = lazyWithRetry(() => import("../features/dashboard/DashboardPage"));
const SupportRequestsPage = lazyWithRetry(() => import("../features/support-requests/SupportRequestsPage"));
const ChatSessionsPage = lazyWithRetry(() => import("../features/chat-sessions/ChatSessionsPage"));
const KnowledgeBasePage = lazyWithRetry(() => import("../features/knowledge-base/KnowledgeBasePage"));
const ReportsPage = lazyWithRetry(() => import("../features/reports/ReportsPage"));
const SettingsPage = lazyWithRetry(() => import("../features/settings/SettingsPage"));

const routes = [
  {
    element: <AuthGuard></AuthGuard>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      {
        path: "/support-requests",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SupportRequestsPage />
          </Suspense>
        ),
      },
      {
        path: "/chat-sessions",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ChatSessionsPage />
          </Suspense>
        ),
      },
      {
        path: "/knowledge-base",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <KnowledgeBasePage />
          </Suspense>
        ),
      },
      {
        path: "/reports",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ReportsPage />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <SettingsPage />
          </Suspense>
        ),
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
