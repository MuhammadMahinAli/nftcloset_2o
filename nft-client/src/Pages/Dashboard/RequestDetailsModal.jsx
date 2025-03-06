import React, { useEffect, useState } from 'react';
import { useUpdateOrderStatusMutation } from '../../features/order/orderApi';
import Swal from 'sweetalert2';

const RequestDetailsModal = ({ isOpenModal, onClose, order }) => {
  // State for form data — adjust or remove as needed
const [updateOrderStatus] = useUpdateOrderStatusMutation()

  const product = order?.productID;
  const orderInfo = order?.productInfo;
  const customerInfo = order?.orderedBy;
  const deliveryAddress = order?.deliveryAddress;

  const {productName, displayImage} = product;
  const {material, size, color} = orderInfo;
  const {email, name, phoneNumber} = customerInfo;
  const {street, country, city, homeAddress } = deliveryAddress;
  // Only show the modal if isOpen is true
  console.log(order?.productInfo);

  const [formData, setFormData] = useState({
    trackingLink: "",
    status: "",
    digitalAsset: "",
  });

    useEffect(() => {
      if (order) {
        setFormData({
          trackingLink: order.trackingLink,
          status: order.status,
          digitalAsset: order.digitalAsset,
        });
;
      }
    }, [order]);
        
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderId = order?._id
  ;
    console.log(formData);
        try {
          const response = await   updateOrderStatus({
            id:orderId,
            data: formData,
          }).unwrap();
    
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Status are updated successfully',
              showConfirmButton: false,
              timer: 1500
            });
            setFormData({
              trackingLink: "",
              status: "",
              digitalAsset: "",
            });
           onClose()
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.data?.message || 'Something went wrong!',
          });
        }
  }

  if (!isOpenModal) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      //onClick={onClose}
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
            src={displayImage}
            alt={productName}
            className="w-32  rounded"
          />
        </div>

        {/* Product Information */}
        <div className="mb-4 space-y-1">
          <p className="text-gray-900 font-bold text-[20px] capitalize">
            Product Name: <span >{productName}</span>
          </p>
          <p className="text-gray-500 font-medium text-[18px]">
            Size: <span className="font-normal capitalize">{size}</span>
          </p>
          <p className="text-gray-500 font-medium text-[18px]">
            Metarial: <span className="font-normal capitalize">{material}</span>
          </p>
          <p className="text-gray-500 font-medium text-[18px]">
            Color: <span className="font-normal capitalize">{color}</span>
          </p>
        </div>

        {/* Customer Details */}
        <div className="mb-4 space-y-1">
          <p className="text-gray-700 font-bold mb-1 text-[20px]">Crossmint Order ID</p>
          <p className="text-gray-500 text-[18px]">ID: {order?.crossMintOrderId}</p>
        </div>
        <div className="mb-4 space-y-1">
          <p className="text-gray-700 font-bold mb-1 text-[20px]">Customer Details</p>
          <p className="text-gray-500 text-[18px]">Email:{email}</p>
          <p className="text-gray-500 text-[18px]">Name: {name?.firstName} {name?.lastName}</p>
          <p className="text-gray-500 text-[18px]">Phone Number: {phoneNumber}</p>
        </div>

        {/* Address Details */}
        <div className="mb-4 space-y-1">
          <p className="text-gray-700 font-bold mb-1 text-[20px]">Delivery Address</p>
          <p className="text-gray-500 text-[18px]">
            Address: {homeAddress}
          </p>
          <p className="text-gray-500 text-[18px]">
            Street: {street}
          </p>
          <p className="text-gray-500 text-[18px]">City: {city}</p>
          <p className="text-gray-500 text-[18px]">Country: {country}</p>
        </div>
<form onSubmit={handleSubmit}>
        {/* Tracking Link */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-1 text-[20px]" htmlFor="trackingLink">
            Tracking Link:
          </label>
          <input
            id="trackingLink"
            name="trackingLink"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter tracking link"
            value={formData.trackingLink}
            onChange={handleInputChange}
          />
        </div>

        {/* Status */}
        <div className="mb-6">
          <label className="font-bold block text-gray-700 mb-1 text-[20px]" htmlFor="statusSelect">
            Status:
          </label>
          <select
            id="status"
            name="status"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.status}
            onChange={handleInputChange}
          >
            <option value="">Select a status</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        {/* Status */}
        <div className="mb-6">
          <label className="font-bold block text-gray-700 mb-1 text-[20px]" htmlFor="statusSelect">
          Digital Assets claim  Status:
          </label>
          <select
            id="digitalAsset"
            name="digitalAsset"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.digitalAsset}
            onChange={handleInputChange}
          >
             <option value="">Select a status</option>
            <option value="claimed">Claimed</option>
            <option value="received">Recieved</option>
          </select>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
          type='submit'
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Save
          </button>
          
        </div>
        </form>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
