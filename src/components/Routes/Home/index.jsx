import React, { useState, useEffect, useCallback } from "react";
import { useData } from "@/stores";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./main.module.styl";
import { Link } from "react-router-dom";
import { useNavigation } from "../../../stores/navigation";

const Home = ({}) => {
  const projectsIndex = useData((state) => state.keys["INDEX"]) || {};
  const [homeProjects, setHomeProjects] = useState([]);
  const sidePanelVisibility = useNavigation((state) => state.sidePanelIsActive);
  const activeMenu = useNavigation((state) => state.activeMenu);
  const resetOverlays = useNavigation((state) => state.resetAllOverlays);

  //eternal loop?
  useEffect(() => {
    const projets = Object.values(projectsIndex).filter(
      (project) => project.homepage_index !== null
    );
    if (JSON.stringify(projets) !== JSON.stringify(homeProjects))
      setHomeProjects(
        projets.sort((p1, p2) => p1.homepage_index - p2.homepage_index)
      );
  }, [projectsIndex]);

  const colorRects = () => {
    const rows = [];
    for (let i = 0; i < 12; i++) {
      rows.push(<div key={i + "box"}></div>);
    }
    return <div className={[styles.colorRectContainer].join(" ")}>{rows}</div>;
  };

  const textTitle = () => (
    <div className={[styles.title, "big_font"].join(" ")}>
      <p>
        Benjamin
        <br />
        Kunz
      </p>
      <p>
        Atelier für
        <br /> Visuelle
        <br /> Gestaltung
      </p>
    </div>
  );

  let galerie = () => {
    return (
      <div className={[styles.galerie].join(" ")}>
        {homeProjects.map((project, index) => {
          const image = project.index_bild[0];
          const ratio = image.height / image.width;
          const width = (window.innerHeight - 10  - 380 ) / ratio;
          return (
            <Link key={project.id} to={`${project.name}`}>
              <div className={[styles.projects].join(" ")}>
                <p className={[styles.titleProjects].join(" ")}>
                  {index + 1} {project.label}
                </p>
                <div className={["duoTone", styles.image].join(" ")}>
                  <LazyLoadImage
                    delayMethod="debounce"
                    className={[styles.image].join(" ")}
                    src={`${import.meta.env.VITE_IMAGE_URL}${image.url}`}
                    placeholderSrc={`${import.meta.env.VITE_IMAGE_URL}${
                      image.variations[0].url
                    }`}
                    threshold={window.innerWidth * 2 + 100}
                    style={{
                      width: width + "px",
                      height: 100 + "%",
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div
      onClick={(sidePanelVisibility || activeMenu) && resetOverlays}
      className={[
        styles.wrapper,
        (sidePanelVisibility || activeMenu) && styles.blur,
      ].join(" ")}
    >
      <div
        className={[
          styles.container,
          (sidePanelVisibility || activeMenu) && styles.blur,
        ].join(" ")}
      >
        {galerie()}
        {colorRects()}
        {textTitle()}
      </div>
    </div>
  );
};

export default React.memo(Home);
