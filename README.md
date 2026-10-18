# She Drives V14.3 - free OSM live location starter

Copy these files into your existing she-drives-sa Next.js project (merge layout.tsx with yours), then:

    npm install leaflet && npm install -D @types/leaflet

Add to Vercel env: NEXT_PUBLIC_OSM_USER_AGENT="She Drives App/1.0 (admin@shedrives.co.za)"

Usage:
    <AddressInput label="From" onSelect={setPickup} />
    <AddressInput label="To" onSelect={setDrop} />
    const r = await calculateDistance(pickup, drop); const f = fare(r.distanceKm, tripsToday);
    <LiveMap pickup={pickup} drop={drop} polyline={r.polyline} driver={driverLocation} />

Needed before launch:
- Logo/icon files (favicon.ico, icon-192.png, icon-512.png, apple-touch-icon.png, logo-header.png): the images were not attached to the chat, so add your own into /public.
- Nominatim allows about 1 request/second and needs an identifying User-Agent. The public OSRM demo server and OSM tile servers are not meant for production traffic: use a paid tile/routing provider, or host your own, once you have real volume.
- Paystack, SOS, admin agreement, PDFs, webhooks and database routes are NOT in this starter.
