"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import { MAP_DARK_STYLE, MAP_LIGHT_STYLE } from "@/lib/map-styles";

export type MapNearbyMarker = {
  name: string;
  coordinates: { lat: number; lng: number };
};

type ProjectLocationMapProps = {
  center: { lat: number; lng: number };
  projectName: string;
  nearbyMarkers: MapNearbyMarker[];
  googleMapsUrl: string;
  highlightRadius?: number;
  darkMap?: boolean;
  className?: string;
};

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID";

function ProjectMapMarker() {
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute -inset-2 animate-ping rounded-full bg-rust/25" />
      <div className="relative h-3.5 w-3.5 rounded-full border-2 border-cream bg-rust shadow-md shadow-rust/35" />
    </div>
  );
}

function ProjectHighlightCircle({
  center,
  radius,
}: {
  center: google.maps.LatLngLiteral;
  radius: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const circle = new google.maps.Circle({
      map,
      center,
      radius,
      fillColor: "#D43F33",
      fillOpacity: 0.12,
      strokeColor: "#D43F33",
      strokeOpacity: 0.55,
      strokeWeight: 2,
      clickable: false,
    });
    return () => {
      circle.setMap(null);
    };
  }, [map, center, radius]);

  return null;
}

function MapContent({
  center,
  projectName,
  nearbyMarkers,
  highlightRadius,
  darkMap,
}: Omit<ProjectLocationMapProps, "googleMapsUrl" | "className">) {
  const mapStyles = darkMap ? MAP_DARK_STYLE : MAP_LIGHT_STYLE;

  const bounds = useMemo(() => {
    const points = [center, ...nearbyMarkers.map((m) => m.coordinates)];
    const lats = points.map((p) => p.lat);
    const lngs = points.map((p) => p.lng);
    return {
      north: Math.max(...lats) + 0.02,
      south: Math.min(...lats) - 0.02,
      east: Math.max(...lngs) + 0.02,
      west: Math.min(...lngs) - 0.02,
    };
  }, [center, nearbyMarkers]);

  return (
    <Map
      defaultCenter={center}
      defaultZoom={13}
      mapId={MAP_ID}
      gestureHandling="greedy"
      disableDefaultUI
      zoomControl={false}
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      styles={mapStyles}
      backgroundColor={darkMap ? "#1C1208" : "#F5F0E8"}
      restriction={{
        latLngBounds: bounds,
        strictBounds: false,
      }}
      className="h-full w-full"
    >
      <ProjectHighlightCircle center={center} radius={highlightRadius ?? 380} />

      <AdvancedMarker position={center} title={projectName} zIndex={100}>
        <ProjectMapMarker />
      </AdvancedMarker>

      {nearbyMarkers.map((marker) => (
        <AdvancedMarker
          key={marker.name}
          position={marker.coordinates}
          title={marker.name}
          zIndex={10}
        >
          <Pin
            background="#1C1208"
            borderColor="#F5F0E8"
            glyphColor="#F5F0E8"
            scale={0.85}
          />
        </AdvancedMarker>
      ))}
    </Map>
  );
}

function getGoogleEmbedSrc(center: { lat: number; lng: number }) {
  const { lat, lng } = center;
  if (MAPS_API_KEY) {
    return `https://www.google.com/maps/embed/v1/view?key=${MAPS_API_KEY}&center=${lat},${lng}&zoom=14`;
  }
  return `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;
}

function GoogleMapEmbed({
  center,
  googleMapsUrl,
  projectName,
  className,
}: {
  center: { lat: number; lng: number };
  googleMapsUrl: string;
  projectName: string;
  className?: string;
}) {
  return (
    <div
      className={`group/map relative h-full min-h-[280px] overflow-hidden bg-cream-deep ${className ?? ""}`}
    >
      <iframe
        title={`${projectName} location`}
        src={getGoogleEmbedSrc(center)}
        className="absolute inset-0 h-[calc(100%+52px)] w-full border-0 opacity-[0.97] saturate-[0.85] contrast-[1.02] sepia-[8%] transition-[filter,transform] duration-500 group-hover/map:saturate-100 group-hover/map:sepia-[4%]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-cream/40 via-transparent to-cream/15" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-cream to-cream/0" />
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 right-5 z-20 border border-dark/15 bg-cream px-4 py-2.5 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-dark transition-colors duration-300 hover:border-rust hover:text-rust"
      >
        View on Maps
      </a>
    </div>
  );
}

export function ProjectLocationMap({
  center,
  projectName,
  nearbyMarkers,
  googleMapsUrl,
  highlightRadius = 380,
  darkMap = false,
  className,
}: ProjectLocationMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`flex h-full min-h-[280px] items-center justify-center bg-cream-deep/80 ${className ?? ""}`}
        aria-hidden
      >
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark/40">
          Loading map…
        </span>
      </div>
    );
  }

  if (!MAPS_API_KEY) {
    return (
      <GoogleMapEmbed
        center={center}
        googleMapsUrl={googleMapsUrl}
        projectName={projectName}
        className={className}
      />
    );
  }

  return (
    <APIProvider apiKey={MAPS_API_KEY}>
      <div className={`relative h-full min-h-[280px] overflow-hidden ${className ?? ""}`}>
        <MapContent
          center={center}
          projectName={projectName}
          nearbyMarkers={nearbyMarkers}
          highlightRadius={highlightRadius}
          darkMap={darkMap}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-cream/20 via-transparent to-transparent" />
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-5 right-5 z-20 border border-dark/15 bg-cream px-4 py-2.5 font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-dark transition-colors duration-300 hover:border-rust hover:text-rust"
        >
          View on Maps
        </a>
      </div>
    </APIProvider>
  );
}
