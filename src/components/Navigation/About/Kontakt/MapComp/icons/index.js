import L from "leaflet";

const iconOffice = new L.Icon({
  iconUrl: "/assets/markers/markerOffice.svg",
  iconSize: new L.Point(90, 25),
  iconAnchor: new L.Point(10, 15),
});

const iconSBB = new L.Icon({
  iconUrl: "/assets/markers/markerSBB.svg",
  iconSize: new L.Point(90, 25),
  iconAnchor: new L.Point(10, 15),
});

export { iconOffice, iconSBB };
