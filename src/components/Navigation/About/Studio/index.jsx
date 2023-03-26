import React, { useState } from "react";


import styles from "./main.module.styl";

import TitleComp from "@/components/UI/TitleComp";

import { markdownToJSX } from "@/helpers/utils";
import SubTitleComp from "@/components/UI/SubTitleComp";
import Accordion from "./Accordion";

const Studio = ({ about }) => {
  const studioData = about?.studio?.first;
  const [openAccos, setOpenAccos] = useState();

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

  const toggleAccordion = (index) => {
    if (index !== openAccos) {
      setOpenAccos(index);
    } else {
      setOpenAccos(undefined);
    }
  };

  return (
    <>
      <div className={[styles.left].join(" ")}>
        <TitleComp text={"Info"} border={true} />
        <div className={[styles.scroller].join(" ")}>
          {markdownToJSX(studioData?.info_shop, {
            className: styles.intro_text,
          })}
          <div className={[styles.imageWrapper].join(" ")}>
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${
                studioData?.single_image[0].url
              }`}
            />
          </div>
        </div>
      </div>
      <div className={[styles.right].join(" ")}>
        <div className={[styles.infoContainer].join(" ")}>
          <TitleComp text={"Weiteres"} />
          {studioData?.weiteres.list.map((info, index) => (
            <Accordion
              key={"accordion_" + index}
              toggled={() => toggleAccordion(index)}
              info={info}
              index={index}
              openAccos={openAccos}
            />
          ))}
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
