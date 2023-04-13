import React, { useState, useEffect, useRef } from "react";

import { Outlet, useLocation } from "react-router";
import Navigation from "@/components/Navigation";

import "./styles/main.styl";

function App() {
  const inProp = useLocation().pathname;

  return (
    <div className="App">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
