import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";

const ShowCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [customer, setCustomer] = useState(null); // State to store customer details

  // Fetch customer details from API
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/customers/${id}`);
        setCustomer(response.data); // Set fetched customer details
      } catch (error) {
        console.error("Error fetching customer:", error);
        alert("Failed to load customer details.");
      }
    };
    fetchCustomer();
  }, [id]);

  if (!customer) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <button
        onClick={() => navigate(-1)} // Navigate back to the previous page
        className="px-4 py-2 mb-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
      >
        <FiArrowLeft /> Retour
      </button>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Détails du client</h1>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="font-semibold text-gray-700">Nom:</p>
            <p>{customer.name || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Téléphone:</p>
            <p>{customer.phone || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Address:</p>
            <p>{customer.address || "N/A"}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="font-semibold text-gray-700">Créé le:</p>
          <p>{customer.created_at || "N/A"}</p>
        </div>
        <div className="mt-2">
          <p className="font-semibold text-gray-700">Mis à jour le:</p>
          <p>{customer.updated_at || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ShowCustomer;
