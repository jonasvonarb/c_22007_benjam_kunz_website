import React, { useState, useEffect } from "react";

import { useData } from "@/stores";
import { useSearchParams } from "react-router-dom";

import styles from "./main.module.styl";

import Studio from "./Studio";
import Kontakt from "./Kontakt";

import Icon from "@/components/UI/Icon";

const query = {
  query: ` {
    contact {
      first {
        single_image {
          width
          height
          url
          description
        }
        e_mail
        mail_template
        adresse
        design_inhalt
        code
        impressum
      }
    }
    studio {
      first {
        single_image {
          width
          height
          url
          description
        }
        info_shop
        weiteres {
          list {
            info_title
            list {
              infos: list {
                listelement
              }
            }
          }
        }
        social_media {
          list {
            social_media_titel
            social_media_url
          }
        }
        downloadable_pdf {
          url
          description
        }
      }
    }
  }`,
};

const About = ({}) => {
  const fetch = useData((state) => state.fetch);
  const about = useData((state) => state.keys["ABOUT"]?.data) || [];
  let [searchParams, setSearchParams] = useSearchParams();
  let [prevParam, setPrevParam] = useState("");

  const changeSite = (site) => {
    if (site) {
      setSearchParams({ about: site });
      setPrevParam(site);
    } else {
      setSearchParams({});
      setTimeout(() => {
        setPrevParam("s");
      }, 1000);
    }
  };

  useEffect(() => {
    const transformer = (data) => {
      let transform = data;
      return { transform };
    };
    fetch(query, "ABOUT", transformer);
  }, []);

  return (
    <div
      className={[
        styles.container,
        searchParams.get("about") && about.length !== 0 && styles.active,
      ].join(" ")}
    >
      <div className={[styles.header].join(" ")}>
        <div onClick={() => changeSite()} className={[styles.title].join(" ")}>
          About
          <Icon name="closing_x" className={styles.closeButton} />
        </div>
        <div className={[styles.nav].join(" ")}>
          <div
            className={[
              styles.navItem,
              (searchParams.get("about") === "s" || !searchParams.get("about")) &&
                styles.active,
            ].join(" ")}
            onClick={() => changeSite("s")}
          >
            Studio
          </div>
          <div
            className={[
              styles.navItem,
              searchParams.get("about") === "k" && styles.active,
            ].join(" ")}
            onClick={() => changeSite("k")}
          >
            Kontakt
          </div>
        </div>
      </div>
      {(searchParams.get("about") === "s" || prevParam === "s") && (
        <div
          className={[
            styles.site,
            (searchParams.get("about") === "s" || prevParam === "s") &&
              styles.active,
          ].join(" ")}
        >
          <Studio about={about} />
        </div>
      )}
      {(searchParams.get("about") === "k" || prevParam === "k") && (
        <div
          className={[
            styles.site,
            (searchParams.get("about") === "k" || prevParam === "k") &&
              styles.active,
          ].join(" ")}
        >
          <Kontakt about={about} />
        </div>
      )}
    </div>
  );
};

export default About;
