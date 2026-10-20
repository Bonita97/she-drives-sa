"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type P = { lat: number; lng: number };

export default function LiveMap({ pickup, drop, driver, polyline }: { pickup: P; drop: P; driver?: P | null; polyline?: any }) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const car = useRef<any>(null);
  const Lr = useRef<any>(null);

  useEffect(() => {
    let dead = false;
    (async () => {
      const L = (await import("leaflet")).default; // client only
      if (dead || !el.current || map.current) return;
      Lr.current = L;
      const m = L.map(el.current).setView([pickup.lat, pickup.lng], 13);
      map.current = m;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors" }).addTo(m);
      const pin = (c: string, t: string) => L.divIcon({ html: `<div style="background:${c};color:#fff;border-radius:50%;width:26px;height:26px;text-align:center;line-height:26px;font-weight:700">${t}</div>`, className: "", iconSize: [26, 26] });
      L.marker([pickup.lat, pickup.lng], { icon: pin("#e91e8c", "A") }).addTo(m);
      L.marker([drop.lat, drop.lng], { icon: pin("#1976d2", "B") }).addTo(m);
      if (polyline) { const g = L.geoJSON(polyline, { style: { color: "#d00", weight: 4 } }).addTo(m); m.fitBounds(g.getBounds()); }
    })();
    return () => { dead = true; map.current?.remove(); map.current = null; car.current = null; };
  }, [pickup.lat, pickup.lng, drop.lat, drop.lng, polyline]);

  useEffect(() => {
    const L = Lr.current, m = map.current;
    if (!L || !m || !driver) return;
    if (!car.current) car.current = L.marker([driver.lat, driver.lng], { icon: L.divIcon({ html: "<div style='font-size:24px'>🚗</div>", className: "", iconSize: [28, 28] }) }).addTo(m);
    else car.current.setLatLng([driver.lat, driver.lng]);
  }, [driver]);

  return <div ref={el} style={{ height: 300, borderRadius: 12 }} />;
}
