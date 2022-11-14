import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const alert_options = {
  success: {
    bg: "bg-green-100  dark:bg-green-200",
    text: "text-green-700 dark:text-green-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-current flex-shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
  },
  error: {
    bg: "bg-red-100  dark:bg-red-200",
    text: "text-red-700 dark:text-red-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  warning: {
    bg: "bg-yellow-100  dark:bg-yellow-200",
    text: "text-yellow-700 dark:text-yellow-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  info: {
    bg: "bg-blue-100  dark:bg-blue-200",
    text: "text-blue-700 dark:text-blue-800",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
};

const Alert = () => {
  const { showAlert, setShowAlert } = useContext(AppContext);
  const [animateClasses, setAnimateClasses] = useState("opacity-0 h-0");
  const [styleClasses, setStyleClasses] = useState("");

  useEffect(() => {
    if (showAlert) {
      setAnimateClasses("opacity-100  mt-5 ");
      setTimeout(() => {
        setAnimateClasses("opacity-0 mt-0");
        setTimeout(() => {
          setShowAlert(null);
          setAnimateClasses("opacity-0 h-0 mt-0");
        }, 10);
      }, showAlert.duration);
    }
  }, [showAlert]);

  return (
    <div
      className={`absolute top-14 right-5 transition-all duration-850 ease-in-out flex p-4 rounded-lg ${animateClasses} ${
        alert_options[showAlert?.type]?.bg
      }`}
      role="alert"
    >
      {alert_options[showAlert?.type]?.icon}
      <div
        className={`ml-3 text-sm font-medium ${
          alert_options[showAlert?.type]?.text
        }`}
      >
        {showAlert?.message}
      </div>
    </div>
  );
};

export default Alert;
