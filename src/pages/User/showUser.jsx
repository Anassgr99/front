import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const ShowUser = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [customer, setCustomer] = useState(null); // State to store customer details
  
  //console.log(id);
  //console.log(customer);
  // Fetch customer details from API
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://5.189.179.133:3000/api/users/${id}`);
        setCustomer(response.data); // Set fetched customer details
      } catch (error) {
        console.error("Error fetching customer:", error);
        alert("Failed to load customer details.");
      }
    };
    fetchCustomer();
  }, [id]);
  if (!customer) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="px-4 py-2 mb-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
      >
        <FiArrowLeft /> Back
      </button>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Customer Details</h1>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Name:</p>
            <p>{customer.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p>{customer.email || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Phone:</p>
            <p>{customer.phone || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Address:</p>
            <p>{customer.address || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Bank Name:</p>
            <p>{customer.bank_name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Account Holder:</p>
            <p>{customer.account_holder || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Account Number:</p>
            <p>{customer.account_number || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Photo:</p>
            {customer.photo ? (
              <img
                src={customer.photo}
                alt="Customer"
                className="h-32 w-32 object-cover rounded-lg"
              />
            ) : (
              <p>No photo available</p>
            )}
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold text-gray-700">Created At:</p>
          <p>{customer.created_at || "N/A"}</p>
        </div>
        <div className="mt-2">
          <p className="font-semibold text-gray-700">Updated At:</p>
          <p>{customer.updated_at || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowUser;
