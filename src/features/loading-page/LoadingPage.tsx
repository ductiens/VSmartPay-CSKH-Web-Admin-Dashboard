import React from "react";
import "./loading-page.css";
import { loadingPage } from "../../assets/index-image";
const LoadingPage: React.FC = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-transparent">
      <img src={loadingPage} alt="loading" className="w-24 h-24 animate-spin-slow" />
    </div>
  );
};

export default LoadingPage;
