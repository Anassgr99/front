import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditOrder = () => {
  const [order, setOrder] = useState(null);
  const [paymentType, setPaymentType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://192.168.1.7:3000/api/orders/${id}`);
        setOrder(response.data);
        // Set the default payment type from the backend
        setPaymentType(response.data.payment_type);
      } catch (error) {
        alert(`Failed to fetch order: ${error.response?.data?.message || error.message}`);
      }
    };
    fetchOrder();
  }, [id]);

  const handleUpdate = async () => {
    if (!paymentType) return alert('Please select a valid status.');

    setIsSubmitting(true);
    try {
      const orderData = { payment_type: paymentType };
      await axios.put(`http://192.168.1.7:3000/api/orders/${id}`, orderData);
      navigate('/orders'); // Redirect to orders page
    } catch (error) {
      alert(`Failed to update order: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Edit Order</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium" htmlFor="paymentType">
              Type de paiement:
            </label>
            <select
              id="paymentType"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              disabled={isSubmitting}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white text-gray-700"
            >
              <option value="">Selectioner Type de paiement</option>
              <option value="Cash">Cash</option>
              <option value="Credit">Credit</option>
            </select>
          </div>
          <button
            onClick={handleUpdate}
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Enregistrer le modification'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;