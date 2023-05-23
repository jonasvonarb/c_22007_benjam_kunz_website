import React, { useState, useEffect } from "react";

import styles from "./main.module.styl";

import TitleComp from "@/components/UI/TitleComp";

import { markdownToJSX } from "@/helpers/utils";
import Icon from "@/components/UI/Icon";

import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import MapComp from "./MapComp";

const Contact = ({ about }) => {
  const contactData = about?.contact?.first;
  const [iActive, setImActive] = useState(false);

  const toggleImpressum = () => {
    if (iActive) {
      setImActive(false);
    } else {
      setImActive(true);
    }
  };

  const Impressum = () => {
    const imp = about?.contact?.first?.impressum;
    return (
      <div className={[styles.impressum, iActive && styles.active].join(" ")}>
        <Icon
          name="closing_x"
          className={styles.closeButton}
          clicked={toggleImpressum}
        />
        <div dangerouslySetInnerHTML={{ __html: imp }} />
      </div>
    );
  };

  return (
    <>
      <div className={[styles.left].join(" ")}>
        <MapContainer
          className={[styles.mapWrapper].join(" ")}
          center={[47.047, 8.308]}
          zoom={15.6}
          zoomSnap={0.1}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <MapComp />
          <div className={[styles.mapWrapperOverlay].join(" ")}></div>{" "}
        </MapContainer>
      </div>
      <div className={[styles.right].join(" ")}>
        <div className={[styles.group].join(" ")}>
          <div>
            <TitleComp className={styles.title} border={true} text={"Mail"} />
            <a href={`mailto:${contactData?.e_mail}`}>{contactData?.e_mail}</a>
          </div>
          <div>
            <TitleComp
              className={styles.title}
              border={true}
              text={"Adresse"}
            />
            <div>
              {markdownToJSX(contactData?.adresse, {
                className: styles.adresse,
              })}
            </div>
          </div>
        </div>
        <div className={[styles.group].join(" ")}>
          <div>
            <TitleComp
              className={styles.title}
              border={true}
              text={"Design + Inhalt"}
            />
            {markdownToJSX(contactData?.design_inhalt, {
              className: styles.design,
            })}
          </div>
          <div>
            <TitleComp className={styles.title} border={true} text={"Code"} />
            {markdownToJSX(contactData?.code, { className: styles.code })}
          </div>
        </div>
        <div className={styles.impressumButton} onClick={toggleImpressum}>
          Impressum
        </div>
        {Impressum()}
      </div>
    </>
  );
};

export default Contact;
