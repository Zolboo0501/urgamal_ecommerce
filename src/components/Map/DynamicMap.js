/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

const { MapContainer, useMap } = ReactLeaflet;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Map = ({ children, className, ...rest }) => {
  let mapClassName = styles.map;

  if (className) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete Leaflet.Icon.Default.prototype._getIconUrl;
      Leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
        iconUrl: "leaflet/images/marker-icon.png",
        shadowUrl: "leaflet/images/marker-shadow.png",
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <ChangeView {...rest} />
      {children(ReactLeaflet, Leaflet)}
    </MapContainer>
  );
};

export default Map;
