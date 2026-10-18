"use client";
import { useEffect, useState } from "react";
import { geocodeAddress, Place } from "@/lib/geo";

type Props = { label: string; placeholder?: string; onSelect: (p: Place) => void };

export default function AddressInput({ label, placeholder = "123 Vilakazi Street, Orlando West, Soweto, 1804", onSelect }: Props) {
  const [q, setQ] = useState("");
  const [opts, setOpts] = useState<any[]>([]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (ok || q.length <= 3) { setOpts([]); return; }
    const t = setTimeout(async () => setOpts((await geocodeAddress(q)).slice(0, 5)), 500); // debounce 500ms
    return () => clearTimeout(t);
  }, [q, ok]);

  return (
    <div style={{ position: "relative", marginBottom: 12 }}>
      <label>{label} {ok && "✅"}</label>
      <input value={q} placeholder={placeholder}
        onChange={(e) => { setQ(e.target.value); setOk(false); }}
        style={{ width: "100%", padding: 12, border: "1.5px solid #C2185B", borderRadius: 10 }} />
      {opts.length > 0 && (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, border: "1px solid #ddd", borderRadius: 10, background: "#fff", position: "absolute", zIndex: 10, width: "100%" }}>
          {opts.map((o) => (
            <li key={o.place_id}>
              <button type="button" style={{ width: "100%", textAlign: "left", padding: 10 }}
                onClick={() => { setQ(o.display_name); setOk(true); setOpts([]); onSelect({ address: o.display_name, lat: parseFloat(o.lat), lng: parseFloat(o.lon) }); }}>
                {o.display_name.length > 60 ? o.display_name.slice(0, 60) + "…" : o.display_name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
