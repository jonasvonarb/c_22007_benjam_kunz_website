import React, { useState, useEffect } from "react";

import { WMSTileLayer, useMap, Marker } from "react-leaflet";

import styles from "./main.module.styl";

import { iconOffice } from "./icons";

const MapComp = () => {
  const map = useMap();
  const mapOptions = {
    url: "https://wms.geo.admin.ch/?",
    layers: "ch.swisstopo.swisssurface3d-reliefschattierung_monodirektional",
    format: "image/png",
    detectRetina: true,
    zoomOffset: -3,
    tileSize: 256,
  };

  return (
    <>
      <WMSTileLayer {...mapOptions} />
      <Marker position={[47.044849, 8.305841]} icon={iconOffice}></Marker>
    </>
  );
};

export default MapComp;
