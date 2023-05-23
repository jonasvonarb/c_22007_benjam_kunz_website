import { createBrowserRouter } from "react-router-dom";

import React, { lazy } from "react";
import App from "../App";
const Home = lazy(() => import("../components/Routes/Home"));
const Project = lazy(() => import("../components/Routes/Project"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:projectName",
        element: Project,
      },
      {
        path: "/",
        element: Home,
      },
    ],
  },
]);
