import axios from "axios";

import { create } from "zustand";
import { devtools } from "zustand/middleware";

import _ from "lodash";

export const useData = create(
  devtools((set, get) => ({
    keys: {},
    projectIds: [],
    projectIdsSorted: [],
    currentProject: undefined,
    fetch: async (query, storeKey, transformer) => {
      let _storeKey = storeKey || "ALL";
      await axios
        .post(import.meta.env.VITE_APIURL, query, {})
        .then((response) => {
          const { transform } = transformer(response.data);
          return set({
            keys: {
              ...get().keys,
              [_storeKey]: get().keys?.[_storeKey]
                ? _.merge(get().keys?.[_storeKey], transform)
                : transform,
              [_storeKey + "_ORIGINAL"]: {
                ...response.data.data,
                ...get().keys?.[_storeKey + "_ORIGINAL"],
              },
            },
          });
        });
    },
    setIds: (ids) => {
      return set({
        projectIds: ids,
      });
    },
    setSortedProjects: (_storeKey) => {
      let allProjectsSorted = {};
      const data = get().keys?.[_storeKey + "_ORIGINAL"];
      if (!data) return;
      data.projects.first.children.list.map((group) => {
        allProjectsSorted = {
          ...allProjectsSorted,
          [group.childtemplates]: group.children.list.map(
            (project) => (project = project.id)
          ),
        };
      });
      return set({ projectIdsSorted: allProjectsSorted });
    },
    getProjectById: (id) => {
      if (!id) return;
      const project = get().keys["INDEX"][id];
      return project;
    },
    getProjectBySlug: (slug) => {
      if (!slug || !get().keys["INDEX"]) return;
      const project = Object.values(get().keys["INDEX"]).find((x) => {
        return x.name === slug;
      });
      return project;
    },
  }))
);
