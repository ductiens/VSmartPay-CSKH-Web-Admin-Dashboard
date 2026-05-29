import React from "react";
import { loadingPage } from "../../assets/index-image";
import "./loading-page.css";
const LoadingInline: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-transparent">
      <img src={loadingPage} alt="loading" className="w-[3rem] h-[3rem] animate-spin-slow" />
    </div>
  );
};

export default LoadingInline;
