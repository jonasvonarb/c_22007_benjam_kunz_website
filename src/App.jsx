import React, { useEffect, useState } from "react";

import { Outlet, Route, Routes, useLocation } from "react-router";
import Navigation from "@/components/Navigation";
import Project from "./components/Routes/Project";
import Home from "./components/Routes/Home";

import { useData } from "@/stores";

import { useTransition, a, easings } from "@react-spring/web";

import "./styles/main.styl";
import SidePanel from "./components/UI/SidePanel";

function App() {
  const location = useLocation();
  const transitions = useTransition(location.pathname, {
    from: { opacity: "0", filter: "blur(12px)" },
    enter: { opacity: "1", filter: "blur(0)" },
    leave: { opacity: "0", filter: "blur(12px)" },
    exitBeforeEnter: true,
    config: {
      duration: 500,
      easing: easings.easeOutCirc,
    },
  });

  

  return (
    <div className="App">
      <Navigation />
      {transitions((styles, item) => (
        <a.div style={styles}>
          <Routes location={item}>
            <Route path="/:projectName" element={<Project />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </a.div>
      ))}
    </div>
  );
}

export default App;
