import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';

const AddCustomer = () => {
  const navigate = useNavigate(); // To redirect after adding a customer
  const [formData, setFormData] = useState({
    name: '',
    email: 'email@gmail.com',
    phone: '',
    address: '',
    photo: 'photo',
    account_holder: 'account holder',
    account_number: '00000000000',
    bank_name: 'bank_name',
  });
  const [error, setError] = useState(null);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://5.189.179.133:3000/api/customers', formData);
      alert('Customer added successfully!');
      navigate('/customer'); // Navigate back to the customers list
    } catch (err) {
      console.error('Error adding customer:', err);
      setError('Failed to add customer. Please try again.');
    }
  };

  return (
    <div className="p-8 bg-white w-full max-w-3xl mx-auto shadow-lg rounded-lg">
      <h1 className="text-4xl mb-8 text-gray-900 font-semibold border-b pb-4">Ajouter Client</h1>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 mb-6 bg-red-100 p-1 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-3 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Telephone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="self-end"> {/* Add self-end to align with input bottom */}
            <label className="invisible block text-sm font-medium text-gray-700">
              Action
            </label>
            <button
              type="submit"
              className="w-full mt-1 p-1 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiSave className="inline-block mr-2" />
              Enregistrer le client
            </button>
          </div>
        </div>
      </form>
    </div>

  );
};

export default AddCustomer;
