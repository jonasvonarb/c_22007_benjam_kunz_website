import React, { useState, useEffect } from "react";
import { markdownToJSX } from "@/helpers/utils";

import styles from "./main.module.styl";
import Icon from "../../../UI/Icon";
import { useData, useNavigation } from "@/stores";
import { useSearchParams } from "react-router-dom";

const SidePanel = ({
  label,
  subtitle,
  infos,
  shop_info,
  shop_galerie,
  type,
  id,
}) => {
  const visibility = useNavigation((state) => state.sidePanelIsActive);
  const toggleSidePanel = useNavigation(
    (state) => state.toggleSidePanelIsActive
  );
  const indexSorted = useData((state) => state.projectIdsSorted);
  const [activeImage, setActiveImage] = useState();
  let [, setSearchParams] = useSearchParams();

  const handelVisibility = (action) => {
    toggleSidePanel(action || "TOGGLE");
    setSearchParams({});
  };

  const index = () => {
    return indexSorted[type]?.indexOf(id) + 1;
  };
  const indexCaracter = (index) => {
    return (index + 10).toString(36).toUpperCase();
  };

  const shopInfo = (
    <div className={[styles.list].join(" ")}>
      <div key={"shop"} id={"shop"} className={[styles.listElement].join(" ")}>
        {markdownToJSX("Info", { className: styles.label })}
        {markdownToJSX(shop_info, { className: styles.text })}
      </div>
    </div>
  );

  const shopGalerie = () => {
    const openImage = (index) => {
      setActiveImage(index + 1);
      console.log("click");
    };
    return (
      <div className={[styles.shopGalerie].join(" ")}>
        {shop_galerie?.map((image, ind) => (
          <div key={image.url} onClick={() => openImage(ind)}>
            <span>
              {type?.charAt(7)}
              {index()}–{indexCaracter(ind)}
            </span>
            <img src={`${import.meta.env.VITE_IMAGE_URL}${image.url}`} />
          </div>
        ))}
      </div>
    );
  };

  const info = () => {
    return (
      <div
        className={[
          styles.info,
          visibility && styles.active,
          activeImage && styles.hidden,
        ].join(" ")}
      >
        <div className={[styles.titleLine].join(" ")}>
          <div className={[styles.index].join(" ")}>
            {type?.charAt(7)}
            {index()}
          </div>
          <div className={[styles.title].join(" ")}>{label}</div>
          <Icon
            name="closing_x"
            className={styles.icon}
            clicked={() => toggleSidePanel(false)}
          />
        </div>
        <div className={[styles.subtitle].join(" ")}>{subtitle}</div>
        <br />
        <br />
        <div className={[styles.list].join(" ")}>
          {infoList}
          {shop_info && shopInfo}
        </div>
        <div className={[styles.gradient].join(" ")} />
        {shop_galerie && (
          <div className={[styles.galerieTitle].join(" ")}>Sujetübersicht</div>
        )}
        {activeImage && (
          <div className={styles.imageContainer}>
            <Icon
              name="closing_x"
              className={styles.icon}
              clicked={() => setActiveImage(undefined)}
            />
            <img
              className={[styles.previewImage].join(" ")}
              src={`${import.meta.env.VITE_IMAGE_URL}${
                shop_galerie[+activeImage - 1].url
              }`}
            />
          </div>
        )}
        {shop_galerie && shopGalerie()}
      </div>
    );
  };
  const infoList = infos?.list.map((info) => (
    <div
      key={info.info_title}
      id={info.info_title}
      className={[styles.listElement].join(" ")}
    >
      {markdownToJSX(info.info_title, { className: styles.label })}
      {markdownToJSX(info.info_text, { className: styles.text })}
    </div>
  ));

  return (
    <>
      <div className={[styles.container].join(" ")}>
        {info()}
        <button onClick={handelVisibility} className={[styles.button]}>
          <div>
            <p className={[styles.index].join(" ")}>
              {type?.charAt(7)}
              {index()}
            </p>
            <p className={[styles.title].join(" ")}>{label}</p>
          </div>
        </button>
      </div>
    </>
  );
};

export default SidePanel;
