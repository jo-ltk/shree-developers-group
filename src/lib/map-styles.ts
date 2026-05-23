/** Luxury editorial map styles aligned with site cream / rust / dark palette */

export const MAP_LIGHT_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#F5F0E8" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#1C1208" }, { lightness: 20 }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#F5F0E8" }, { lightness: 40 }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#2A2118" }],
  },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#5c4f42" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e8e2d6" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#4a6741" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#d4cfc4" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#EDE8DF" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#c9c0b0" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#5c4f42" }] },
  { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#5c4f42" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9d4dc" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6b7d8a" }] },
];

export const MAP_DARK_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1C1208" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#F5F0E8" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1C1208" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#EDE8DF" }],
  },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#c9bfb0" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#2a3528" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2A2118" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#3d3228" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3d3228" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#5c4f42" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#172430" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6b7d8a" }] },
];
