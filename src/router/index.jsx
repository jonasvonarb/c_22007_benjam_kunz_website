import { createBrowserRouter } from "react-router-dom";

import React from "react";
import App from "../App";
import Home from "../components/Routes/Home";
import Project from "../components/Routes/Project";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/:projectName",
        element: <Project />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
