import React, { useState, useEffect, useCallback } from "react";
import { useData } from "@/stores";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import styles from "./main.module.styl";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useNavigation } from "../../../stores/navigation";

const Home = ({}) => {
  const projectsIndex = useData((state) => state.keys["INDEX"]) || {};
  const [homeProjects, setHomeProjects] = useState([]);
  const sidePanelVisibility = useNavigation((state) => state.sidePanelIsActive);
  const activeMenu = useNavigation((state) => state.activeMenu);
  const resetOverlays = useNavigation((state) => state.resetAllOverlays);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();

  const resetOverlaysAction = () => {
    setSearchParams({});
    resetOverlays();
  };

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
  const svg = `
    <filter
      id="yellow-blue-acid"
      x="-10%"
      y="-10%"
      width="120%"
      height="120%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feColorMatrix
        type="matrix"
        values=".33 .33 .33 0 0
        .33 .33 .33 0 0
        .33 .33 .33 0 0
        0 0 0 1 0"
        in="SourceGraphic"
        result="colormatrix"
      />
      <feComponentTransfer in="colormatrix" result="componentTransfer">
        <feFuncR type="table" tableValues="0.9 0.59 0.94" />
        <feFuncG type="table" tableValues="0.9 0.59 1" />
        <feFuncB type="table" tableValues="0.9 0.59 0.48" />
        <feFuncA type="table" tableValues="0 1" />
      </feComponentTransfer>
      <feBlend
        mode="normal"
        in="componentTransfer"
        in2="SourceGraphic"
        result="blend"
      />
    </filter>`;
  var svgString = svg;

  let galerie = () => {
    return (
      <div className={[styles.galerie].join(" ")}>
        <svg
          style={{
            position: "fixed",
            display: "none",
            height: 0,
            opacity: 0,
            width: 0,
            top: "-100vh",
            left: "-100vw",
          }}
          dangerouslySetInnerHTML={{ __html: svgString }}
        />
        {homeProjects.map((project, index) => {
          const image = project.index_bild[0];
          const ratio = image.height / image.width;
          const width = (window.innerHeight - 10 - 380) / ratio;
          return (
            <div
              className={[styles.link].join(" ")}
              key={project.id}
              onClick={() => navigate(`/${project.name}`)}
            >
              <div className={[styles.projects].join(" ")}>
                <p className={[styles.titleProjects].join(" ")}>
                  {index + 1} {project.label}
                </p>
                <LazyLoadImage
                  delayMethod="debounce"
                  className={[styles.image].join(" ")}
                  src={`${import.meta.env.VITE_IMAGE_URL}${image.url}`}
                  threshold={window.innerWidth * 2 + 100}
                  wrapperClassName={[styles.imageWrapper].join(" ")}
                  style={{
                    width: width + "px",
                    height: 100 + "%",
                  }}
                />
                <LazyLoadImage
                  delayMethod="debounce"
                  className={[styles.imageFilter].join(" ")}
                  src={`${import.meta.env.VITE_IMAGE_URL}${image.url}`}
                  placeholderSrc={`${import.meta.env.VITE_IMAGE_URL}${
                    image.variations[0].url
                  }`}
                  threshold={window.innerWidth * 2 + 100}
                  wrapperClassName={[styles.imageFilterWrapper].join(" ")}
                  style={{
                    width: width + "px",
                    height: 100 + "%",
                    backgroundColor: "white",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      onClick={
        (sidePanelVisibility ||
          activeMenu ||
          searchParams.get("p") === "s" ||
          searchParams.get("p") === "k") &&
        resetOverlaysAction
      }
      className={[
        styles.wrapper,
        (sidePanelVisibility ||
          activeMenu ||
          searchParams.get("p") === "s" ||
          searchParams.get("p") === "k") &&
          styles.blur,
      ].join(" ")}
    >
      <div className={[styles.container].join(" ")}>
        {galerie()}
        {colorRects()}
        {textTitle()}
      </div>
    </div>
  );
};

export default React.memo(Home);
