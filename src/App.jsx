import React, { useState, useEffect } from "react";

import { Outlet } from "react-router";
import Navigation from "@/components/Navigation";

import "./styles/main.styl";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
