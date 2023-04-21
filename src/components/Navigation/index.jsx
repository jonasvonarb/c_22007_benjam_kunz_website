import React, { useEffect, useState } from "react";
import { useNavigation, useData } from "@/stores";
import IndexNav from "@/components/Navigation/IndexNav";

import styles from "./main.module.styl";
import { NavLink, useLocation, Route, useSearchParams } from "react-router-dom";
import About from "./About";
import SidePanel from "../UI/SidePanel";

const Navigation = () => {
  const setActiveMenu = useNavigation((state) => state.setActiveMenu);
  const location = useLocation();
  let [, setSearchParams] = useSearchParams();
  const toggleSidePanel = useNavigation(
    (state) => state.toggleSidePanelIsActive
  );

  const setMenu = (event) => {
    setActiveMenu(event.target.innerText.toLowerCase());
    setSearchParams({});
    toggleSidePanel(false);
  };
  const openAbout = () => {
    setSearchParams({ p: "s" });
    toggleSidePanel(false);
  };
  const closeAll = () => {
    setSearchParams({});
    toggleSidePanel(false);
  };

  const slug = useLocation().pathname.replace("/", "");
  const getProjectBySlug = useData((state) => state.getProjectBySlug);
  const [project, setProject] = useState();

  useEffect(() => {
    if (slug !== "") {
      let wait = setInterval(() => {
        if (getProjectBySlug(slug) === null) return;
        clearInterval(wait);
        setProject(getProjectBySlug(slug));
      }, 10);
    } else {
      console.log(slug);
      setProject(null);
    }
  }, [slug]);

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
          onClick={closeAll}
        >
          Home
        </NavLink>
        <div
          className={[
            styles.about,
            location.pathname !== "/" ? styles.right : styles.left,
          ].join(" ")}
          onClick={openAbout}
        >
          About
        </div>
        <div className={[styles.index].join(" ")} onClick={setMenu}>
          Index
        </div>
      </nav>
      {project && <SidePanel project={project} />}
    </div>
  );
};

export default Navigation;
