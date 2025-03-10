import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";
import { FiArrowLeft, FiUser, FiPhone, FiMapPin, FiCalendar, FiMail } from "react-icons/fi";

const ShowCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // Hook for navigation
  const [customer, setCustomer] = useState(null); // State to store customer details
  const { theme } = useContext(ThemeContext);

  // Format date to YYYY-MM-DD hour:minute
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    
    // Get date part (YYYY-MM-DD)
    const datePart = date.toISOString().split('T')[0];
    
    // Get time part (hour:minute)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const timePart = `${hours}:${minutes}`;
    
    // Combine date and time
    return `${datePart} ${timePart}`;
  };

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
    <div className={`p-8 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
      >
        <FiArrowLeft /> Retour
      </button>

      <div className={`shadow-lg rounded-xl p-6 ${theme === "dark" ? "bg-gray-800" : "bg-white"} transition-all`}>
        <h1 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          Détails du client
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <FiUser className="text-blue-500" size={20} />
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Nom:</p>
              <p className="text-lg">{customer.name || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiPhone className="text-green-500" size={20} />
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Téléphone:</p>
              <p className="text-lg">{customer.phone || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiMail className="text-red-500" size={20} />
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email:</p>
              <p className="text-lg">{customer.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FiMapPin className="text-yellow-500" size={20} />
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Adresse:</p>
              <p className="text-lg">{customer.address || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-3">
            <FiCalendar className="text-purple-500" size={20} />
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Créé le:</p>
              <p className="text-lg">{formatDate(customer.created_at)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <FiCalendar className="text-indigo-500" size={20} />
            <div>
              <p className={`font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Mis à jour le:</p>
              <p className="text-lg">{formatDate(customer.updated_at)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCustomer;