import React, { useState, useEffect, Fragment } from "react";

import styles from "./main.module.styl";

import TitleComp from "@/components/UI/TitleComp";

import { markdownToJSX } from "@/helpers/utils";
import SubTitleComp from "@/components/UI/SubTitleComp";

const Studio = ({ about }) => {
  const studioData = about?.studio?.first;

  // Fetch all the details element.
  const details = document.querySelectorAll("details");

  // Add the onclick listeners.
  details.forEach((targetDetail) => {
    targetDetail.addEventListener("click", () => {
      // Close all the details that are not targetDetail.
      details.forEach((detail) => {
        if (detail !== targetDetail) {
          detail.removeAttribute("open");
        }
      });
    });
  });

  const Accordion = (info) => {
    const [isOpen, setIsopen] = useState(false);

    const toggleAccordion = () => {
      setIsopen((prevState) => !prevState);
    };

    return (
      <Fragment key={info.info_title}>
        <SubTitleComp
          clicked={toggleAccordion}
          className={styles.info_title}
          text={info.info_title}
          icon="closing_x_bold"
        />
        <div className={[styles.accordion, isOpen && styles.open].join(" ")}>
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

  return (
    <>
      <div className={[styles.left].join(" ")}>
        <TitleComp text={"Info"} border={true} />
        {markdownToJSX(studioData?.info_shop, { className: styles.intro_text })}
        <div className={[styles.imageWrapper].join(" ")}>
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}${
              studioData?.single_image[0].url
            }`}
          />
        </div>
      </div>
      <div className={[styles.right].join(" ")}>
        <div className={[styles.infoContainer].join(" ")}>
          <TitleComp text={"Weiteres"} />
          {studioData?.weiteres.list.map((info) => {
            return Accordion(info);
          })}
        </div>
        <div className={[styles.secondaryContainer].join(" ")}>
          <div>
            <TitleComp text={"Social Media"} />
            {studioData?.social_media.list.map((social) => {
              return (
                <SubTitleComp
                  key={social.social_media_titel}
                  text={social.social_media_titel}
                  link={social.social_media_url}
                  icon="arrow_link"
                />
              );
            })}
          </div>
          <div>
            <TitleComp text={"Downloads"} />
            <SubTitleComp
              text="Curriculum Vitae (PDF)"
              linkIntern={studioData?.downloadable_pdf[0].url}
              icon="download"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Studio;
