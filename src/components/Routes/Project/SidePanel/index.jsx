import React, { useState, useEffect } from "react";
import { markdownToJSX } from "@/helpers/utils";

import styles from "./main.module.styl";
import Icon from "../../../UI/Icon";
import { useData, useNavigation } from "@/stores";

const SidePanel = ({ label, subtitle, infos, type, id }) => {
  const visibility = useNavigation((state) => state.sidePanelIsActive);
  const toggleSidePanel = useNavigation(
    (state) => state.toggleSidePanelIsActive
  );
  const indexSorted = useData((state) => state.projectIdsSorted);

  const handelVisibility = (action) => {
    toggleSidePanel(action || "TOGGLE");
  };

  const index = () => {
    return indexSorted[type]?.indexOf(id) + 1;
  };

  const info = () => {
    return (
      <div className={[styles.info, visibility && styles.active].join(" ")}>
        <div className={[styles.titleLine].join(" ")}>
          <div className={[styles.index].join(" ")}>
            {type?.charAt(7)}
            {index()}
          </div>
          <div className={[styles.title].join(" ")}>{label}</div>
          <Icon
            name="closing_x"
            className={styles.icon}
            clicked={() => handelVisibility(false)}
          />
        </div>
        <div className={[styles.subtitle].join(" ")}>{subtitle}</div>
        <br />
        <br />
        <div className={[styles.list].join(" ")}>{infoList}</div>
        <div className={[styles.gradient].join(" ")} />
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
