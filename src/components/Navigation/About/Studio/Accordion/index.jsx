import React, { useState, useEffect, Fragment, useRef } from "react";
import { markdownToJSX } from "@/helpers/utils";
import SubTitleComp from "@/components/UI/SubTitleComp";

import gsap from "gsap";

import styles from "./main.module.styl";

const Accordion = ({ info, index, openAccos, toggled }) => {
  const accordion = useRef();

  const clickHandler = () => {
    toggled();
  };

  useEffect(() => {
    if (openAccos === index) {
      gsap.to(accordion.current, {
        height: "auto",
        duration: 0.5,
      });
    } else {
      gsap.to(accordion.current, {
        height: 0,
        duration: 0.5,
      });
    }
  }, [openAccos]);

  return (
    <Fragment key={info.info_title}>
      <SubTitleComp
        clicked={clickHandler}
        className={styles.info_title}
        text={info.info_title}
        icon="closing_x_bold"
        open={openAccos === index}
      />
      <div ref={accordion} className={[styles.accordion].join(" ")}>
        {info.list.infos.map((iE) => {
          return (
            <span key={iE.listelement}>
              {markdownToJSX(iE.listelement, {
                className: styles.info,
              })}
            </span>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Accordion;
