'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import L from 'leaflet';
// import TicketForm from '../TicketForm/TicketForm';
import { collection, getDocs } from 'firebase/firestore';
import TicketDisplay from '@/components/TicketDisplay/TicketDisplay';
import { db } from '@/utils/firebase';
import { useTranslation } from 'react-i18next';
import ReactDatePicker from 'react-datepicker';
import { useAuth } from '@/contexts/AuthContext';

const IntMap = ({ onMarkerClick, alfirnas }) => {
  const [t, i18n] = useTranslation();
  const [selectedDate, setSelectedDate] = useState(null);
  const markersRef = useRef([]);
  const categoryRef = useRef([]);
  const neighborhoodRef = useRef([]);
  const { tickets, setTickets } = useAuth();
  const prevData = useRef([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');

  const handleMarkerClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowTicket(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchPost = useCallback(async () => {
    try {
      const response = await fetch('/api/tickets');
      const data = await response.json();
      console.log('tickets', data.tickets);
      var newData;

      if (!alfirnas) {
        newData = data.tickets.filter((ticket) => ticket.status === 'Accepted');
      } else {
        newData = data.tickets;
        console.log(newData);
      }

      if (JSON.stringify(prevData.current) !== JSON.stringify(newData)) {
        setTickets(newData);
        prevData.current = newData;
        console.log('Calld');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [alfirnas]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPost();
    };
    fetchData();

    const intervalId = setInterval(fetchData, 50000);

    return () => clearInterval(intervalId);
  }, [fetchPost]);

  function removeMarkerByCoordinates() {
    for (let i = 0; i < markersRef.current.length; i++) {
      const marker = markersRef.current[i];
      mapInstance.current.removeLayer(marker);
    }
  }

  // eslint-disable-next-line
  useEffect(() => {
    removeMarkerByCoordinates();
    if (tickets.length > 0) {
      if (selectedCategory === '' && selectedNeighborhood === '') {
        tickets?.forEach((TData) => {
          var icon = L.icon({
            iconUrl:
            TData.status === 'New'
              ? '/assets/images/redpin.png'
              : TData.status === 'Accepted'
                ? '/assets/images/greenpin.png'  // New condition for 'New' status
                : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            shadowAnchor: [14, 41],
            popupAnchor: [0, -41],
          });
          if (!selectedDate) {
            if (mapInstance.current) {
              const marker = L.marker([TData.Latitude, TData.Longitude], {
                icon: icon,
              })
                .addTo(mapInstance.current)
                .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
              markersRef.current.push(marker);
            }
          } else {
            const sDate = new Date(selectedDate);
            const tDate = new Date(TData.IncidentStartDate);
            const sDateString = sDate.toISOString().split('T')[0];
            const tDateString = tDate.toISOString().split('T')[0];
            if (sDateString === tDateString) {
              const marker = L.marker([TData.Latitude, TData.Longitude], {
                icon: icon,
              })
                .addTo(mapInstance.current)
                .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
              markersRef.current.push(marker);
            }
          }
        });
      } else if (selectedCategory === '' && selectedNeighborhood !== '') {
        tickets?.forEach((TData) => {
          var icon = L.icon({
            iconUrl:
              TData.status === 'Accepted'
                ? '/assets/images/greenpin.png'
                : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            shadowAnchor: [14, 41],
            popupAnchor: [0, -41],
          });
          if (TData.LocationDirection === selectedNeighborhood) {
            if (!selectedDate) {
              const marker = L.marker([TData.Latitude, TData.Longitude], {
                icon: icon,
              })
                .addTo(mapInstance.current)
                .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
              markersRef.current.push(marker);
            } else {
              const sDate = new Date(selectedDate);
              const tDate = new Date(TData.IncidentStartDate);
              const sDateString = sDate.toISOString().split('T')[0];
              const tDateString = tDate.toISOString().split('T')[0];
              if (sDateString === tDateString) {
                const marker = L.marker([TData.Latitude, TData.Longitude], {
                  icon: icon,
                })
                  .addTo(mapInstance.current)
                  .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
                markersRef.current.push(marker);
              }
            }
          }
        });
      } else if (selectedCategory !== '' && selectedNeighborhood === '') {
        tickets?.forEach((TData) => {
          var icon = L.icon({
            iconUrl:
              TData.status === 'Accepted'
                ? '/assets/images/greenpin.png'
                : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            shadowAnchor: [14, 41],
            popupAnchor: [0, -41],
          });
          if (TData.SplClassificationID === selectedCategory) {
            if (!selectedDate) {
              const marker = L.marker([TData.Latitude, TData.Longitude], {
                icon: icon,
              })
                .addTo(mapInstance.current)
                .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
              markersRef.current.push(marker);
            } else {
              const sDate = new Date(selectedDate);
              const tDate = new Date(TData.IncidentStartDate);
              const sDateString = sDate.toISOString().split('T')[0];
              const tDateString = tDate.toISOString().split('T')[0];
              if (sDateString === tDateString) {
                const marker = L.marker([TData.Latitude, TData.Longitude], {
                  icon: icon,
                })
                  .addTo(mapInstance.current)
                  .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
                markersRef.current.push(marker);
              }
            }
          }
        });
      } else if (selectedCategory !== '' && selectedNeighborhood !== '') {
        tickets?.forEach((TData) => {
          var icon = L.icon({
            iconUrl:
              TData.status === 'Accepted'
                ? '/assets/images/greenpin.png'
                : 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:
              'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            shadowSize: [41, 41],
            iconAnchor: [12, 41],
            shadowAnchor: [14, 41],
            popupAnchor: [0, -41],
          });
          if (
            TData.SplClassificationID === selectedCategory &&
            TData.LocationDirection === selectedNeighborhood
          ) {
            if (!selectedDate) {
              const marker = L.marker([TData.Latitude, TData.Longitude], {
                icon: icon,
              })
                .addTo(mapInstance.current)
                .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
              markersRef.current.push(marker);
            } else {
              const sDate = new Date(selectedDate);
              const tDate = new Date(TData.IncidentStartDate);
              const sDateString = sDate.toISOString().split('T')[0];
              const tDateString = tDate.toISOString().split('T')[0];
              if (sDateString === tDateString) {
                const marker = L.marker([TData.Latitude, TData.Longitude], {
                  icon: icon,
                })
                  .addTo(mapInstance.current)
                  .on('click', () => handleMarkerClick(TData)); // Handle marker click and set the selected ticket
                markersRef.current.push(marker);
              }
            }
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, selectedCategory, selectedNeighborhood, selectedDate]);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicket, setShowTicket] = useState(false);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        scrollWheelZoom: true,
        center: [24.475219749999997, 39.589692472222225], // Initial center coordinates
        zoom: 13,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(
        mapInstance.current
      );
    }
  }, [tickets]);

  const handleClose = () => {
    setSelectedTicket(null);
    setShowTicket(false);
  };

  prevData.current.forEach((item) => {
    if (!categoryRef.current.includes(item.SplClassificationID)) {
      categoryRef.current.push(item.SplClassificationID);
    }
  });

  prevData.current.forEach((item) => {
    if (!neighborhoodRef.current.includes(item.LocationDirection)) {
      neighborhoodRef.current.push(item.LocationDirection);
    }
  });

  console.log('tickets', tickets);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Category Selector */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2" htmlFor="category">
            {t('select_category')}
          </label>
          <select
            id="category"
            name="category"
            className="w-full rounded-lg py-2 px-4 bg-white text-gray-900 shadow-md ring-1 ring-gray-300 focus:ring-2 focus:ring-[#0D9488] transition-all duration-200 ease-in-out hover:shadow-lg"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">{t('all')}</option>
            {categoryRef.current.map((item, i) => (
              <option key={`${i}_cat`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
  
        {/* Date Picker */}
        <div className="flex flex-col" style={{ zIndex: 1000 }}>
          <label className="text-lg font-semibold mb-2" htmlFor="date">
            {t('select_date')}
          </label>
          <ReactDatePicker
            className="w-full rounded-lg py-2 px-4 bg-white text-gray-900 shadow-md ring-1 ring-gray-300 focus:ring-2 focus:ring-[#0D9488] transition-all duration-200 ease-in-out hover:shadow-lg"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText={t('select_date')}
          />
        </div>
  
        {/* Neighborhood Selector */}
        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-2" htmlFor="neighborhood">
            {t('select_neighborhood')}
          </label>
          <select
            id="neighborhood"
            name="neighborhood"
            className="w-full rounded-lg py-2 px-4 bg-white text-gray-900 shadow-md ring-1 ring-gray-300 focus:ring-2 focus:ring-[#0D9488] transition-all duration-200 ease-in-out hover:shadow-lg"
            onChange={(e) => setSelectedNeighborhood(e.target.value)}
          >
            <option value="">{t('all')}</option>
            {neighborhoodRef.current.map((item, i) => (
              <option key={`${i}_neighbor`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
  
      {/* Unified Map and Ticket Display Container */}
      <div
        className="flex mt-4 p-5 rounded-lg shadow-lg bg-white transition-all duration-200"
        style={{ height: '650px' }}
      >
        <div
          ref={mapRef}
          className="flex-grow rounded-l-lg overflow-hidden shadow-md"
          style={{ height: '100%', width: '70%' }}
        />
        {showTicket && selectedTicket && (
          <div
            className="w-1/3 h-full p-4 bg-gray-100 rounded-r-lg overflow-auto shadow-md"
            style={{ borderLeft: '1px solid #e5e7eb' }}
          >
            <TicketDisplay
              handleClose={handleClose}
              ticket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
              setTickets={setTickets}
              alfirnas={alfirnas}
            />
          </div>
        )}
      </div>
    </>
  );
  

};

export default IntMap;
