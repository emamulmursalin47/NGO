import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Roots.jsx";
import ReactQueryProvider from "../providers/react-query.jsx";
import { Toaster } from "react-hot-toast";
import { UserTypeProvider } from "../hooks/userContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactQueryProvider>
      <UserTypeProvider>
        <RouterProvider router={router} />
      </UserTypeProvider>
      <Toaster />
    </ReactQueryProvider>
  </React.StrictMode>
);
