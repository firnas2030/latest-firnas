//not used
import "./TicketStyle.css"
import React from "react";

const TicketForm = ({ ticket }) => {
  return (
    <div
      className="relative p-6 rounded-xl shadow-lg bg-gradient-to-br from-teal-400 to-blue-600 text-white transition-transform transform hover:scale-105 hover:shadow-2xl"
      style={{
        display: "block",
        maxWidth: "350px",
        minWidth: "300px",
        margin: "auto",
        position: "relative",
      }}
    >
      {/* Glowing Border */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-teal-200 to-blue-300 opacity-50 rounded-xl blur-lg"
        style={{ zIndex: -1 }}
      ></div>
  
      {/* Card Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xl font-bold">Ticket Details</h4>
      </div>
  
      {/* Card Body */}
      <div className="space-y-3 text-sm">
        <p className="flex items-center space-x-2">
          <span className="font-semibold">Ticket ID:</span>
          <span>{ticket.Ticket_ID}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold">Name:</span>
          <span>{ticket.name}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold">Latitude:</span>
          <span>{ticket.late}</span>
        </p>
        <p className="flex items-center space-x-2">
          <span className="font-semibold">Longitude:</span>
          <span>{ticket.long}</span>
        </p>
  
        {/* Google Maps Link */}
        <p>
          <a
            href={`https://www.google.com/maps/place/${ticket.late},${ticket.long}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-200 hover:text-white underline"
          >
            View on Google Maps
          </a>
        </p>
  
        {/* Image */}
        <div className="rounded-lg overflow-hidden shadow-lg border border-white/20">
          <img
            src={`data:image/png;base64,${ticket.img}`}
            alt="Location"
            className="w-full h-32 object-cover"
          />
        </div>
      </div>
    </div>
  );
  
};









export default TicketForm;
/*
        <div className="mx-auto text-center mt-1" id="actions">
        {/* <a
          onclick="updateStatus(1,82)"
          className="btn btn-success text-white mr-3"
        >
          Approve
        </a>
  
        <a
          onclick="updateStatus(0,82)"
          className="btn btn-danger text-white "
        >
          Reject
        </a>
        
        <a
          onclick="getAutoMaxStatus(0,82)"
          id="sendTicket"
          className="btn btn-info btn-block text-white mt-2"
          target="_blank"
        >
          <i className="fa fa-cloud" /> Update ticket status
        </a> */
        // 