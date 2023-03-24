import React from "react";
import { useNavigation } from "@/stores";
import IndexNav from "@/components/Navigation/IndexNav";

import styles from "./main.module.styl";
import { NavLink, useLocation, Route, useSearchParams } from "react-router-dom";
import About from "./About";

const Navigation = () => {
  const setActiveMenu = useNavigation((state) => state.setActiveMenu);
  const location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();

  const setMenu = (event) => {
    setActiveMenu(event.target.innerText.toLowerCase());
  };

  return (
    <div className={[styles.container].join(" ")}>
      <IndexNav />
      <About />
      <nav>
        <NavLink
          className={[
            styles.home,
            location.pathname === "/" && styles.hidden,
          ].join(" ")}
          to=""
        >
          Home
        </NavLink>
        <div
          className={[
            styles.about,
            location.pathname !== "/" ? styles.right : styles.left,
          ].join(" ")}
          onClick={() => setSearchParams({ p: "s" })}
        >
          About
        </div>
        <div className={[styles.index].join(" ")} onClick={setMenu}>
          Index
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
