import React, { useState, useEffect } from "react";

import { WMSTileLayer, Marker } from "react-leaflet";


import { iconOffice, iconSBB } from "./icons";

const MapComp = () => {
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
      <Marker position={[47.044849, 8.305841]} icon={iconOffice} />
      <Marker position={[47.0493, 8.3105]} icon={iconSBB} />
    </>
  );
};

export default MapComp;
