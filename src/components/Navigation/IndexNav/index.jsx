import React, { useState, useEffect, useRef } from "react";
import { useData, useNavigation } from "@/stores";

import styles from "./main.module.styl";
import { useNavigate } from "react-router-dom";
import Icon from "../../UI/Icon";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/black-and-white.css";

const query = {
  query: ` {
      projects {
        first {
          children {
            __typename
            list {
              numChildren
              name
              __typename
              template
              ... on GraphicdesignPage {
                label
                group_index
                childtemplates
              }
              ... on PhotographyPage {
                label
                group_index
                childtemplates
              }
              ... on ShopPage {
                label
                group_index
                childtemplates
              }
              children {
                list {
                  ... on ProjectGraficPage {
                    __typename
                    name
                    id
                    label
                    homepage_index
                    index_bild {
                      variations {
                        url
                      }
                      url
                      height
                      width
                    }
                  }
                  ... on ProjectPhotoPage {
                    __typename
                    name
                    id
                    label
                    homepage_index
                    index_bild {
                      variations {
                        url
                      }
                      url
                      height
                      width
                    }
                  }
                  ... on ProjectShopPage {
                    __typename
                    name
                    id
                    label
                    homepage_index
                    index_bild {
                      variations {
                        url
                      }
                      url
                      height
                      width
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`,
};

const IndexNav = ({}) => {
  const fetch = useData((state) => state.fetch);
  const setIds = useData((state) => state.setIds);
  const setSortedProjects = useData((state) => state.setSortedProjects);
  const projectsIndex = useData((state) => state.keys["INDEX"]) || [];
  const indexSorted = useData((state) => state.projectIdsSorted);
  const activeMenu = useNavigation((state) => state.activeMenu);
  const setActiveMenu = useNavigation((state) => state.setActiveMenu);
  const activeGroup = useNavigation((state) => state.activeGroup);
  const setActiveGroup = useNavigation((state) => state.setActiveGroup);
  const navigate = useNavigate();
  const groupRef = useRef();

  useEffect(() => {
    const transformer = (data) => {
      const _data = data.data.projects.first;
      let allProjects = [];
      _data.children.list.map((groups) => {
        allProjects = allProjects.concat(groups.children.list);
      });
      const _allProjects = allProjects.reduce(
        (a, v) => ({ ...a, [v.id]: v }),
        {}
      );

      const ids = Object.keys(_allProjects);

      let transform = _allProjects;
      setIds(ids);
      return { transform };
    };
    fetch(query, "INDEX", transformer);
  }, []);

  useEffect(() => {
    setSortedProjects("INDEX");
  }, [projectsIndex]);

  const groupClickHandler = (event) => {
    const index = event.target.getAttribute("index");
    groupRef.current.scrollTo(0, 0);
    setActiveGroup(+index);
  };

  const linkTo = (to) => {
    closeMenu();
    navigate(`${projectsIndex[to]?.name}`);
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const Header = () => {
    return (
      <div className={[styles.header].join(" ")}>
        <div onClick={closeMenu} className={[styles.headerIndex].join(" ")}>
          <p>Index</p>
          <Icon
            name="closing_x"
            className={[styles.icon, styles.closingX].join(" ")}
          />
        </div>
        <div className={[styles.groups].join(" ")}>
          {Object.keys(indexSorted).map((group, ind) => (
            <div
              key={group}
              index={ind}
              className={[
                styles.group,
                activeGroup === ind && styles.active,
              ].join(" ")}
              onClick={groupClickHandler}
            >
              {group === "ProjectGraficPage" && "Grafikdesign"}
              {group === "ProjectPhotoPage" && "Fotografie"}
              {group === "ProjectShopPage" && "Shop"}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const Group = (group, groupName) => {
    return group.map((projectId, index) => (
      <div
        onClick={() => linkTo(projectId)}
        className={styles.link}
        key={projectId}
      >
        <div
          key={projectsIndex[projectId]?.id}
          className={[styles.projects].join(" ")}
        >
          <div className={[styles.title].join(" ")}>
            {groupName.charAt(7).toUpperCase().replace("P", "F") + (index + 1)}{" "}
            {projectsIndex[projectId]?.label}
          </div>
          <LazyLoadImage
            delayMethod="debounce"
            className={[styles.image].join(" ")}
            src={`${import.meta.env.VITE_IMAGE_URL}${
              projectsIndex[projectId]?.index_bild[0].url
            }`}
            placeholderSrc={`${import.meta.env.VITE_IMAGE_URL}${
              projectsIndex[projectId]?.index_bild[0].variations[0].url
            }`}
            threshold={(window.innerWidth * 2) / 3}
            style={{
              height: 100 + "%",
            }}
          />
        </div>
      </div>
    ));
  };

  return (
    <div
      className={[
        styles.container,
        activeMenu === "index" && styles.active,
      ].join(" ")}
    >
      {Header()}
      <div ref={groupRef} className={[styles.index].join(" ")}>
        {Object.keys(indexSorted).map(
          (groupName, index) =>
            activeGroup === index && (
              <div key={groupName} className={[styles.group].join(" ")}>
                {Group(indexSorted[groupName], groupName)}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default IndexNav;
