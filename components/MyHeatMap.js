'use client';
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const Heatmap = ({ data }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (data.length) {
      if (mapRef.current && !mapInstance.current) {
        // Initialize map
        mapInstance.current = L.map(mapRef.current, {
          scrollWheelZoom: true,
          center: [24.475219749999997, 39.589692472222225],
          zoom: 13,
        });

        // Add tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(mapInstance.current);

        // Prepare heatmap data
        const heatmapData = data.map((item) => [
          item.Latitude,
          item.Longitude,
          0.5,
        ]);

        // Custom gradient with more glow
        const customGradient = {
          0.4: 'blue',
          0.5: 'lime',
          0.6: 'yellow',
          0.7: 'orange',
          1.0: 'red',
        };

        // Create a heatmap layer with updated styling
        L.heatLayer(heatmapData, {
          radius: 30,
          blur: 20,
          maxZoom: 15,
          minOpacity: 0.5,
          gradient: customGradient,
        }).addTo(mapInstance.current);
      }
    }
  }, [data]);

  return (
    <div
      ref={mapRef}
      style={{
        height: '100%',
        width: '100%',
        boxShadow: '0px 0px 20px rgba(0, 255, 255, 0.3)',
        borderRadius: '10px',
        overflow: 'hidden',
      }}
    />
  );
};

export default Heatmap;
