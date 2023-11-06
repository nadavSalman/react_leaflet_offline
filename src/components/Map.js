import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer } from "react-leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [map, setMap] = useState();
  const [progress, setProgress] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (map) {
      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          subdomains: "abc",
          minZoom: 13,
          maxZoom: 16
        }
      );

      tileLayerOffline.addTo(map);

      const controlSaveTiles = L.control.savetiles(tileLayerOffline, {
        zoomlevels: [13, 14, 15, 16], // optional zoomlevels to save, default current zoomlevel
        confirm(layer, succescallback) {
          // eslint-disable-next-line no-alert
          if (window.confirm(`Save ${layer._tilesforSave.length}`)) {
            succescallback();
          }
        },
        confirmRemoval(layer, successCallback) {
          // eslint-disable-next-line no-alert
          if (window.confirm("Remove all the tiles?")) {
            successCallback();
          }
        },
        saveText:
          '<i class="fas fa-download" aria-hidden="true" title="Save tiles"></i>',
        rmText:
          '<i class="fas fa-trash" aria-hidden="true"  title="Remove tiles"></i>'
      });

      controlSaveTiles.addTo(map);

      let progress;
      tileLayerOffline.on("savestart", (e) => {
        progress = 0;
        setTotal(e._tilesforSave.length);
      });
      tileLayerOffline.on("savetileend", () => {
        progress += 1;
        setProgress(progress);
      });
    }
  }, [map]);

  return (
    <div>
      <p>Progreso: {progress}</p>
      <p>Total: {total}</p>

      <MapContainer
        style={{ width: "100vw", height: "75vh" }}
        center={[-3.9945, -79.2012]}
        zoom={14}
        minZoom={13}
        maxZoom={16}
        scrollWheelZoom={true}
        whenCreated={setMap}
      ></MapContainer>
    </div>
  );
};
