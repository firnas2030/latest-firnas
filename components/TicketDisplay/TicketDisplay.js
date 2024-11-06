import React, { useRef } from 'react';
import moment from 'moment-timezone';
import './TicketStyle.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function TicketDisplay({
  handleClose,//A function to close the ticket display.
  ticket, //The ticket object containing all the necessary data.
  alfirnas, //A boolean flag that controls whether to show certain actions (approve, reject, delete).
  setTickets,
  setSelectedTicket,
}) {
  const lastUsedIdRef = useRef(4999);
  const lastusedticketid = useRef(4999);
  const imagePopupRef = useRef(null);

  const formatDate = (inputDateString) => { //Formats a given date string into MM/DD/YYYY
    const dateObject = new Date(inputDateString);
    const formattedDate = `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    return formattedDate;
  };

  const formattedDate = formatDate(ticket.TicketDate);

  const generateNextId = () => {
    lastUsedIdRef.current += 1;
    return lastUsedIdRef.current;
  };

  const generateNextTicketId = () => {
    lastusedticketid.current += 1;
    return lastusedticketid.current;
  };

  const UpdateStatus = async (type) => {
    try {
      const response = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...ticket, status: type }),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setSelectedTicket({ ...ticket, status: type });
        setTickets((prev) => {
          return [
            ...prev.map((item) => {
              if (item._id === ticket._id) {
                return { ...item, status: type };
              } else {
                return item;
              }
            }),
          ];
        });
      } else if (response.status === 404) {
        toast.error(data.message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  const handleDelete = async () => { 
    try {
      const response = await fetch(`/api/tickets/${ticket._id}`, {
        method: 'DELETE',
      });
  
      if (response.status === 200) {
        const contentType = response.headers.get('Content-Type');
        let data;
  
        if (contentType && contentType.includes('application/json')) {
          data = await response.json();
        } else {
          data = { message: await response.text() };
        }
  
        toast.success(data.message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
  
        // Remove the deleted ticket from the list
        setTickets((prev) => prev.filter((item) => item._id !== ticket._id));
        // Optionally close the ticket view
        handleClose();
      } else {
        const data = await response.json();
        toast.error(data.message, {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (err) {
      toast.error(err.message, {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };
  
  

  const openImageInPopup = (imageUrl) => {
    // Close the previous popup if it exists
    if (imagePopupRef.current) {
      imagePopupRef.current.close();
    }

    const popupWidth = 650;
    const popupHeight = 496;
    const left = (window.screen.width - popupWidth) / 2;
    const top = (window.screen.height - popupHeight) / 2;

    // Open a new popup window
    const imagePopup = window.open(
      '',
      'ImagePopup',
      `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,menubar=no,toolbar=no,location=no,status=no`
    );
    imagePopup.document.write(
      `<html><body><img src="${imageUrl}" alt="Image"></body></html>`
    );

    // Store a reference to the new popup
    imagePopupRef.current = imagePopup;
  };
  return (
    <div
      className="relative p-6 rounded-2xl shadow-xl bg-gradient-to-br from-[#0D9488] to-[#055E56] text-white max-w-lg mx-auto transition-transform transform hover:scale-105 hover:shadow-2xl"
      style={{ minWidth: "300px", margin: "auto", position: "relative" }}
    >
      {/* Glowing Border */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-300 to-teal-500 opacity-20 rounded-2xl blur-lg"
        style={{ zIndex: -1 }}
      ></div>
  
      {/* Header with Close Button */}
      <div className="flex items-center justify-between mb-4 border-b border-[#0D9488]/50 pb-2">
        <h2 className="text-xl font-semibold text-white">Ticket Details</h2>
        <button
          className="text-white text-lg font-bold p-1 rounded-full bg-red-600 hover:bg-red-700 transition"
          onClick={() => handleClose()}
        >
          X
        </button>
      </div>
  
      {/* Ticket Details */}
      <div className="space-y-3 text-sm">
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Ticket No:</span>
          <span>{ticket.IncidentNo}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Status:</span>
          <span>{ticket.status}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Date/Time:</span>
          <span>
            {moment(ticket.IncidentStartDate)
              .tz('Asia/Riyadh')
              .format('MM/DD/YYYY hh:mm A')}
          </span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Latitude:</span>
          <span>{ticket.Latitude}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Longitude:</span>
          <span>{ticket.Longitude}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Class Name:</span>
          <span>{ticket.IssueDescription}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Neighborhood:</span>
          <span>{ticket?.LocationDirection}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Prediction Quantity:</span>
          <span>{ticket.predictionQuantity || 1}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold text-teal-200">Output Type:</span>
          <span>{ticket.SplClassificationID}</span>
        </p>
  
        {/* Image Display */}
        <div className="rounded-lg overflow-hidden shadow-lg border border-[#0D9488]/50 mt-4 mb-2">
          <img
            src={ticket.IncidentImage}
            alt="Location"
            className="w-full h-64 object-cover cursor-pointer"
            onClick={() => openImageInPopup(ticket.IncidentImage)}
          />
        </div>
  
        {/* Google Maps Link */}
        <p>
          <a
            href={`https://www.google.com/maps/place/${ticket.Latitude},${ticket.Longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 hover:text-teal-200 underline transition"
          >
            View on Google Maps
          </a>
        </p>
      </div>
  
      {/* Action Buttons */}
      {alfirnas && (
        <div className="flex flex-col mt-6 space-y-3">
          <button
            className="w-full py-2 px-4 rounded-lg font-semibold bg-[#0D9488] text-gray-100 hover:bg-[#086F6B] transition"
            onClick={() => UpdateStatus('Accepted')}
          >
            Approve
          </button>
          <button
            className="w-full py-2 px-4 rounded-lg font-semibold bg-red-500 text-gray-100 hover:bg-red-600 transition"
            onClick={() => UpdateStatus('Rejected')}
          >
            Reject
          </button>
          <button
            className="w-full py-2 px-4 rounded-lg font-semibold bg-yellow-500 text-gray-100 hover:bg-yellow-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="w-full py-2 px-4 mt-4 rounded-lg font-semibold bg-blue-500 text-gray-100 hover:bg-blue-600 transition">
            Update Ticket Status
          </button>
        </div>
      )}
    </div>
  );
  
  
}

export default TicketDisplay;
