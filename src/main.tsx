import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { store } from "./redux/auth/store";
import { queryClient } from "./config/queryClient";
import AppRoutes from "./config/AppRouter";
import { restoreAuth } from "./redux/auth/slice";
import "./i18n"

store.dispatch(restoreAuth());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);