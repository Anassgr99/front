import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiX } from "react-icons/fi";

const ShowOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/${id}`
        );
        const orderData = response.data;
        console.log(orderData);
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Grid Layout */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Order ID:</strong> {order?.id || "N/A"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Invoice No:</strong> {order?.invoice_no || "N/A"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Order Date:</strong> {order?.order_date || "N/A"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Status:</strong>{" "}
          <span
            className={`${
              order?.order_status === 1 ? "text-green-600" : "text-yellow-600"
            } font-bold`}
          >
            {order?.order_status === 1 ? "Complete" : "Pending"}
          </span>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Type de paiement:</strong> {order?.payment_type || "N/A"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Payer:</strong> ${order?.pay || "0.00"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Due:</strong> ${order?.due || "0.00"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Sub Total:</strong> ${order?.sub_total || "0.00"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>TVA:</strong> ${order?.vat || "0.00"}
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <strong>Total:</strong>{" "}
          <span className="text-blue-600 font-bold">
            ${order?.total || "0.00"}
          </span>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Détails du client
          </h2>
          <table className="table-auto w-full">
            <tbody>
              {/* Customer Name */}
              <tr className="border-b">
                <td className="font-bold text-gray-700 py-2">Nom:</td>
                <td className="text-gray-600 py-2">{order.customer_name}</td>
              </tr>

              {/* Created At */}
              <tr className="border-b">
                <td className="font-bold text-gray-700 py-2">Créé le:</td>
                <td className="text-gray-600 py-2">{order.created_at}</td>
              </tr>

              {/* Updated At */}
              <tr className="border-b">
                <td className="font-bold text-gray-700 py-2">Mis à jour le:</td>
                <td className="text-gray-600 py-2">{order.updated_at}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
            Produits dans la commande
          </h2>

          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Produit ID</th>
                  <th className="py-2 px-4">Prix</th>
                  <th className="py-2 px-4">Quantité</th>
                </tr>
              </thead>
              <tbody>
                <tr
                >
                  
                  <td className="py-2 px-4">{order.product_name}</td>
                  <td className="py-2 px-4">${order.unitcost}</td>
                  <td className="py-2 px-4">{order.quantity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          {/* Edit Button */}
          {/* <Link
              to={`/editOrder/${order.id}`}
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
            >
              <FiEdit className="mr-2" />
              Edit
            </Link> */}

          {/* Cancel Button */}
          <Link
            to="/orders"
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
          >
            <FiX className="mr-2" />
            Annuler
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShowOrder;
