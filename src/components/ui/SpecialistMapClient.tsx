"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Specialist } from "@/lib/specialists";

const SPECIALIST_ICON = L.divIcon({
  className: "dop-marker",
  html: `<div style="
    width: 14px; height: 14px;
    background: #C8FF00;
    border: 2px solid #0D0D0D;
    border-radius: 50%;
    box-shadow: 0 0 0 2px rgba(200, 255, 0, 0.3), 0 0 12px rgba(200, 255, 0, 0.5);
  "></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

interface SpecialistMapClientProps {
  rows: Specialist[];
}

export default function SpecialistMapClient({ rows }: SpecialistMapClientProps) {
  // Default to a US center if no rows
  const center: [number, number] =
    rows.length > 0 ? [rows[0].lat, rows[0].lng] : [39.5, -98.35];

  return (
    <MapContainer
      center={center}
      zoom={rows.length > 0 ? 4 : 3}
      scrollWheelZoom={true}
      style={{ height: "480px", width: "100%", borderRadius: "0.75rem" }}
      className="border border-white/10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {rows.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng]} icon={SPECIALIST_ICON}>
          <Popup>
            <div style={{ fontFamily: "system-ui", minWidth: "180px" }}>
              <strong style={{ fontSize: "13px" }}>{s.name}</strong>
              <div style={{ fontSize: "11px", color: "#555", marginTop: "2px" }}>
                {s.specialty} · {s.city}, {s.region}
              </div>
              {s.rating && (
                <div style={{ color: "#f59e0b", fontSize: "11px", marginTop: "4px" }}>
                  {"★".repeat(s.rating)}
                  <span style={{ color: "#ddd" }}>{"★".repeat(5 - s.rating)}</span>
                </div>
              )}
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#C8FF00", fontSize: "11px", marginTop: "6px", display: "inline-block" }}
                >
                  Visit site →
                </a>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
