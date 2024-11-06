'use client';
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const Heatmap = ({ data, center }) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([center.lat, center.lng], 4);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Create an array of heatmap data (latitude, longitude, intensity)
    const heatmapData = data.map((item) => [item.lat, item.lng, 0.5]);
    const customGradient = {
      0.4: 'blue',
      0.65: 'lime',
      1: 'red',
    };
    // Create a heatmap layer
    L.heatLayer(heatmapData, {
      radius: 20,
      opacity: 0.2,
      minOpacity: 1,
      gradient: customGradient,
    }).addTo(map);
  }, []); // Empty dependency array to ensure this effect runs only once

  return <div id="map" className="w-full h-full rounded-3xl"></div>;
};

export default Heatmap;
