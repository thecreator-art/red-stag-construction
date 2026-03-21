'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function OfficeMapInner({ className = '' }: { className?: string }) {
  const position: [number, number] = [34.1016, -118.3400]; // Defined Cahuenga Blvd Headquarters

  useEffect(() => {
    // Leaflet requires window execution, deleting default prototype paths to prevent standard Next.js build errors.
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <div className={`w-full h-full z-0 ${className}`}>
      <MapContainer 
        center={position} 
        zoom={14} 
        scrollWheelZoom={false}
        className="w-full h-full relative z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup className="font-sans">
            <div className="font-extrabold text-sm uppercase tracking-widest text-[#B31217]">Red Stag Construction</div>
            <div className="text-xs text-gray-700 mt-1 font-bold">Headquarters - Cahuenga Blvd</div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
