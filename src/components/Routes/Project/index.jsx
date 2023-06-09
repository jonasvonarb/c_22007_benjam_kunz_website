import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useData, useNavigation } from "@/stores";

import styles from "./main.module.styl";
import Galerie from "./galerie";
import SidePanel from "./SidePanel";

const dataQuery = `{
  list {
    __typename
    id
    name
    subtitle
    infos{
      ... on RepeaterInfosPageArray {
        list {
          info_title
          info_text
        }
      }
    }
    videos {
      url
      description
    }
    galerie {
      width
      height
      url
      description
      variations{
        url
      }
    }
  }
}`;

const Project = ({}) => {
  const fetch = useData((state) => state.fetch);
  const params = useParams();
  const projectsIndex =
    useData((state) => {
      return { ...state.keys["INDEX"] };
    }) || {};
  const [projectInfo, setProjectInfo] = useState();
  const [project, setProject] = useState();
  const getProjectById = useData((state) => state.getProjectById);
  const getProjectBySlug = useData((state) => state.getProjectBySlug);
  const [type, setType] = useState();
  const sidePanelVisibility = useNavigation((state) => state.sidePanelIsActive);
  const activeMenu = useNavigation((state) => state.activeMenu);
  const resetOverlays = useNavigation((state) => state.resetAllOverlays);

  useEffect(() => {
    const __typename = getProjectBySlug(params?.projectName)?.["__typename"];
    if (__typename) {
      const _type =
        __typename.replace("Page", "").slice(0, 1).toLowerCase() +
        __typename.replace("Page", "").slice(1, __typename.length);
      setType(_type);
    }
  }, [project?.name]);

  useEffect(() => {
    const _project = getProjectBySlug(params?.projectName);
    const id = _project?.["id"];
    if (!id || !type) return;
    const query = {
      query: ` {${type}(s: "id=${id}")${dataQuery}}`,
    };
    fetch(query, "INDEX", transformer);
  }, [type, params?.projectName]);

  useEffect(() => {
    setProject(getProjectBySlug(params?.projectName));
  }, [params?.projectName, JSON.stringify(projectsIndex)]);

  const transformer = (data) => {
    const elment = data.data[type].list[0];
    const obj = { [elment.id]: elment };
    let transform = obj;
    return { transform };
  };

  return (
    <div className={[styles.container].join(" ")}>
      <div
        onClick={(sidePanelVisibility || activeMenu) && resetOverlays}
        className={[
          styles.wrapper,
          (sidePanelVisibility || activeMenu) && styles.blur,
        ].join(" ")}
      >
        <Galerie
          galerie={project?.galerie}
          type={type}
          videos={project?.videos}
        />
      </div>
      <SidePanel
        label={project?.label}
        subtitle={project?.subtitle}
        infos={project?.infos}
        type={project?.__typename}
        id={project?.id}
      />
    </div>
  );
};

export default Project;
