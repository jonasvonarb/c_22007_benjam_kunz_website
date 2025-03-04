import React, { useState, useEffect, useRef } from "react";
import { markdownToJSX } from "@/helpers/utils";

import styles from "./main.module.styl";
import Icon from "@/components/UI/Icon";
import Chevron from "@/components/UI/Chevron";
import { useData, useNavigation } from "@/stores";
import { useSearchParams } from "react-router-dom";
import { useMedia } from "react-use";

const SidePanel = ({ project }) => {
  const label = project?.label;
  const subtitle = project?.subtitle;
  const infos = project?.infos;
  const shop_info = project?.info_shop;
  const shop_galerie = project?.shop_galerie;
  const type = project?.__typename;
  const id = project?.id;
  const visibility = useNavigation((state) => state.sidePanelIsActive);
  const toggleSidePanel = useNavigation(
    (state) => state.toggleSidePanelIsActive
  );
  const indexSorted = useData((state) => state.projectIdsSorted);
  const [activeImage, setActiveImage] = useState();
  let [, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const isWide = useMedia("(min-width: 900px)");
  const galerie = useRef();
  const [index, setIndex] = useState();

  const keys = useData((state) => {
    return { ...state.keys };
  });

  const handelVisibility = (action) => {
    toggleSidePanel(action || "TOGGLE");
    setSearchParams({});
  };

  useEffect(() => {
    setIndex(indexSorted[type]?.indexOf(id) + 1);
  }, [JSON.stringify(project)]);

  const shopInfo = (
    <div
      key={"shop"}
      id={"shop"}
      className={[styles.listElement, styles.shopInfo].join(" ")}
    >
      {markdownToJSX("Info", { className: styles.label })}
      {markdownToJSX(shop_info, { className: styles.text })}
    </div>
  );

  const [currentPos, setCurrentpos] = useState(0);

  const shopGalerie = () => {
    const openImage = (index) => {
      setActiveImage(index + 1);
    };
    const dist = isWide ? 200 : window.innerWidth / 3;
    const nextImage = () => {
      const _curretnPos = galerie.current.scrollLeft;
      setCurrentpos(_curretnPos + dist);
      galerie.current.scroll({
        top: 0,
        left: _curretnPos + dist,
        behavior: "smooth",
      });
    };
    const lastImage = () => {
      const _curretnPos = galerie.current.scrollLeft;
      if (_curretnPos <= 5) return;
      setCurrentpos(_curretnPos - dist);
      galerie.current.scroll({
        top: 0,
        left: _curretnPos - dist,
        behavior: "smooth",
      });
    };

    return (
      <>
        <div>
          <div
            onClick={lastImage}
            className={[styles.last, currentPos === 0 && styles.inactive].join(
              " "
            )}
          >
            <Chevron left={true} />
          </div>
          <div onClick={nextImage} className={[styles.next].join(" ")}>
            <Chevron />
          </div>
        </div>
        <div ref={galerie} className={[styles.shopGalerie].join(" ")}>
          {shop_galerie?.map((image, ind) => (
            <div
              className={[styles.image].join(" ")}
              key={image.url}
              onClick={() => openImage(ind)}
            >
              <span>
                {type.charAt(7).toUpperCase().replace("P", "F")}
                {index}–{(ind + 10).toString(36).toUpperCase()}
              </span>
              <img src={`${import.meta.env.VITE_IMAGE_URL}${image.url}`} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const mail_template = useData((state) => state.keys["ABOUT"]?.data?.contact?.first.mail_template) || "";


  const info = () => {
    var formattedBody = mail_template
    var mailToLink =
      "mailto:hello@benjaminkunz.ch?subject=Bestellung%20Benjaminkunz.ch:%20________&body=" +
      encodeURIComponent(formattedBody);
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
            {type.charAt(7).toUpperCase().replace("P", "F")}
            {index}
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
        {isWide && <br />}
        <div className={[styles.list].join(" ")}>
          {type === "ProjectShopPage" && (
            <>
              <div
                key={"buy"}
                id={"buy"}
                className={[styles.listElement].join(" ")}
              >
                {markdownToJSX("Buy", { className: styles.label })}
                <a
                  className={[styles.text, "link"].join(" ")}
                  href={mailToLink}
                >
                  Bestellen <span>&#8594;</span>
                </a>
              </div>
            </>
          )}
          {infoList}
          {shop_info && shopInfo}
          {shop_galerie && (
            <div className={[styles.galerieTitle].join(" ")}>
              Sujetübersicht
            </div>
          )}
          {shop_galerie && shopGalerie()}
          {/* <div
            className={[
              shop_galerie ? styles.gradientStore : styles.gradient,
            ].join(" ")}
          /> */}
        </div>

        {activeImage && (
          <div className={[styles.imageContainer].join(" ")}>
            <Icon
              name="closing_x"
              className={styles.icon}
              clicked={() => setActiveImage(undefined)}
            />
            <img
              className={[
                styles.previewImage,
                isLoading ? styles.loading : styles.isLoaded,
              ].join(" ")}
              onLoad={() => setIsLoading(false)}
              src={`${import.meta.env.VITE_IMAGE_URL}${
                shop_galerie[+activeImage - 1].url
              }`}
            />
            <img
              className={[
                styles.previewImageLoader,
                isLoading ? styles.loading : styles.isLoaded,
              ].join(" ")}
              src={`${import.meta.env.VITE_IMAGE_URL}${
                shop_galerie[+activeImage - 1].variations[0].url
              }`}
            />
          </div>
        )}
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
            <p className={[styles.title].join(" ")}>
              {type.charAt(7).toUpperCase().replace("P", "F")}
              {index} {isWide ? label : "info"}
            </p>
          </div>
        </button>
      </div>
    </>
  );
};

export default SidePanel;
