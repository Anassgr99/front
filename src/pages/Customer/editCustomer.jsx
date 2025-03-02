import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCustomer = () => {
  const { id } = useParams(); // Get the customer ID from the URL
  const navigate = useNavigate(); // For navigating after form submission

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    // Fetch the customer data when the component mounts
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://192.168.1.7:3000/api/customers/${id}`);
        setCustomerData(response.data); // Set the fetched customer data into state
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };
    fetchCustomer();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  // Handle form submission (only updates specified columns)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://192.168.1.7:3000/api/customers/${id}`, {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        photo: customerData.photo,
        account_holder: customerData.account_holder,
        account_number: customerData.account_number,
        bank_name: customerData.bank_name
      });

      alert("Customer updated successfully!");
      navigate(`/showCustomer/${id}`); // Redirect to the customer details page after update
    } catch (error) {
      console.error("Error updating customer", error);
      alert("Failed to update customer.");
    }
  };

  return (
    <div className="p-8 bg-gray-50 w-full">
      <h1 className="text-3xl mb-6 text-gray-800">Modifier Client</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={customerData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700">
            Téléphone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={customerData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-gray-700">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={customerData.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enregistrer le modification
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
