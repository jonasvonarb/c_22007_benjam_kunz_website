import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useNavigation = create(
  devtools((set, get) => ({
    activeMenu: null,
    setActiveMenu: (menuIndex) =>
      set({
        activeMenu: menuIndex,
      }),
    activeGroup: 0,
    setActiveGroup: (menuIndex) =>
      set({
        activeGroup: menuIndex,
      }),
    sidePanelIsActive: false,
    toggleSidePanelIsActive: (action) => {
      let newValue;
      if (action === "TOGGLE") {
        newValue = !get().sidePanelIsActive;
      } else {
        newValue = action;
      }
      return set({
        sidePanelIsActive: newValue,
      });
    },
    resetAllOverlays: () => {
      return set({
        sidePanelIsActive: false,
        activeMenu: null,
      });
    },
  }))
);
