import React, { useState, useEffect } from "react";

import { useData, useNavigation } from "@/stores";
import { useSearchParams } from "react-router-dom";

import styles from "./main.module.styl";

import Studio from "./Studio";
import Kontakt from "./Kontakt";
import TitleComp from "@/components/UI/TitleComp";
import { markdownToJSX } from "@/helpers/utils";

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
      setSearchParams({ p: site });
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
        searchParams.get("p") && about.length !== 0 && styles.active,
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
              (searchParams.get("p") === "s" || !searchParams.get("p")) &&
                styles.active,
            ].join(" ")}
            onClick={() => changeSite("s")}
          >
            Studio
          </div>
          <div
            className={[
              styles.navItem,
              searchParams.get("p") === "k" && styles.active,
            ].join(" ")}
            onClick={() => changeSite("k")}
          >
            Kontakt
          </div>
        </div>
      </div>
      {(searchParams.get("p") === "s" || prevParam === "s") && (
        <div
          className={[
            styles.site,
            (searchParams.get("p") === "s" || prevParam === "s") &&
              styles.active,
          ].join(" ")}
        >
          <Studio about={about} />
        </div>
      )}
      {(searchParams.get("p") === "k" || prevParam === "k") && (
        <div
          className={[
            styles.site,
            (searchParams.get("p") === "k" || prevParam === "k") &&
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
