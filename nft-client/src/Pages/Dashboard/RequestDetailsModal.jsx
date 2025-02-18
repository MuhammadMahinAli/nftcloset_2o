import React, { useState } from 'react';

const RequestDetailsModal = ({ isOpenModal, onClose }) => {
  // State for form data — adjust or remove as needed
  const [trackingLink, setTrackingLink] = useState('');
  const [status, setStatus] = useState('Processing');

  // Only show the modal if isOpen is true
  if (!isOpenModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Stop click propagation so clicking on the modal content doesn’t close it */}
      <div
        className="relative w-10/12 md:w-[500px] max-w-md bg-white rounded-lg p-6 md:p-8  max-h-screen md:max-h-[600px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (X) in top-right corner */}
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Request Details</h2>

        {/* Product Image (replace src with your product image) */}
        <div className="flex justify-center mb-4">
          <img
            src="https://images.unsplash.com/photo-1627389955646-6596047473d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8M2QlMjBncmFwaGljc3xlbnwwfHwwfHx8MA%3D%3D"
            alt="Product"
            className="w-32  rounded"
          />
        </div>

        {/* Product Information */}
        <div className="mb-4 space-y-1">
          <p className="text-gray-900 font-bold text-[20px]">
            Product Name: <span >Black Hoodie</span>
          </p>
          <p className="text-gray-500 font-medium text-[18px]">
            Size: <span className="font-normal">XL</span>
          </p>
          <p className="text-gray-500 font-medium text-[18px]">
            Color: <span className="font-normal">Black</span>
          </p>
        </div>

        {/* Customer Details */}
        <div className="mb-4 space-y-1">
          <p className="text-gray-700 font-bold mb-1 text-[20px]">Customer Details</p>
          <p className="text-gray-500 text-[18px]">Email: mahinali@gmail.com</p>
          <p className="text-gray-500 text-[18px]">Name: Mahin Ali</p>
          <p className="text-gray-500 text-[18px]">Phone Number: +88017654234</p>
        </div>

        {/* Address Details */}
        <div className="mb-4 space-y-1">
          <p className="text-gray-700 font-bold mb-1 text-[20px]">Customer Details</p>
          <p className="text-gray-500 text-[18px]">
            Street: Ct-06-19 6Th Floor Subang Square Jin Ss 15/4G Ss15
          </p>
          <p className="text-gray-500 text-[18px]">City: Petaling Jaya</p>
          <p className="text-gray-500 text-[18px]">Area: Selangor</p>
        </div>

        {/* Tracking Link */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1 text-[20px]" htmlFor="trackingLink">
            Tracking Link:
          </label>
          <input
            id="trackingLink"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter tracking link"
            value={trackingLink}
            onChange={(e) => setTrackingLink(e.target.value)}
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="font-bold block text-gray-700 mb-1 text-[20px]" htmlFor="statusSelect">
            Status:
          </label>
          <select
            id="statusSelect"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              // Handle saving the changes here
              console.log(`Tracking Link: ${trackingLink}, Status: ${status}`);
              onClose();
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
