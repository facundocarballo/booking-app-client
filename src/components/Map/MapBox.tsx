import React from "react";
import { Map, Marker } from "mapbox-gl";
import { useColorModeValue } from "@chakra-ui/react";

interface IMapBox {
  latitude: number;
  longitude: number;
  setLatitude: (_lat: number) => void;
  setLongitude: (_long: number) => void;
}
export const MapBox = ({
  latitude,
  longitude,
  setLongitude,
  setLatitude,
}: IMapBox) => {
  // Attributes
  const mapDiv = React.useRef<HTMLDivElement>(null);
  const bg = useColorModeValue("#B794F4", "#6B46C1");
  // Context
  // Methods
  function onDragEnd(marker: Marker) {
    const coordinates = marker.getLngLat();
    setLatitude(coordinates.lat);
    setLongitude(coordinates.lng);
  }

  React.useEffect(() => {
    const map = new Map({
      container: mapDiv.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 13,
    });

    const marker = new Marker({
      color: bg,
      draggable: true,
    })
      .setLngLat([longitude, latitude])
      .setDraggable(true)
      .addTo(map);

    marker.on("dragend", () => onDragEnd(marker));
  }, []);
  // Component
  return (
    <div
      ref={mapDiv}
      style={{
        height: "210px",
        width: "20vw",
        borderRadius: 10,
      }}
    ></div>
  );
};
