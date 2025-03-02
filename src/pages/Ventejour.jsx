import React, { useEffect, useState } from "react";
import axios from "axios";

const VenteJour = () => {
  const [ordersByStore, setOrdersByStore] = useState({}); // Commandes regroupées par store
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); // Commande sélectionnée pour afficher les détails des produits

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://192.168.1.7:3000/api/orders"); // Update with your API URL
        const orders = response.data;
  
        console.log("Données reçues : ", orders); // Debugging
  
        // Get today's date in the correct format (assuming order_date is in ISO format)
        const today = new Date().toISOString().split("T")[0];
  
        // Filter orders for today
        const todayOrders = orders.filter((order) => {
          const orderDate = order.order_date.split("T")[0]; // Assuming ISO 8601 format
          return orderDate === today;
        });
  
        // Regroup orders by store en parsant le champ JSON "products"
        const groupedByStore = todayOrders.reduce((acc, order) => {
          const store = order.order_store || "Inconnu";
  
          // Parse the JSON contenu dans order.products
          let productArray = [];
          try {
            productArray = JSON.parse(order.products);
          } catch (error) {
            console.error("Erreur de parsing des produits pour order", order.order_id, error);
          }
          if (!acc[store]) acc[store] = [];
          const existingOrder = acc[store].find((o) => o.id === order.order_id);
          if (existingOrder) {
            // Concaténer les produits si la commande existe déjà
            
            existingOrder.products = existingOrder.products.concat(
              productArray.map((product) => ({
                product_id: product.product_id,
                product_name: product.product_name,
                quantity: product.quantity,
                unitcost: product.unitcost,
              }))
            );
          } else {
            acc[store].push({
              id: order.order_id,
              customer_name: order.customer_name || "Client Inconnu",
              order_status: order.order_status,
              total: order.total,
              products: productArray.map((product) => ({
                product_id: product.product_id,
                product_name: product.product_name,
                quantity: product.quantity,
                unitcost: product.unitcost,
              })),
            });
          }
          return acc;
        }, {});
  
        setOrdersByStore(groupedByStore);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Une erreur s'est produite lors du chargement des commandes.");
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);

  if (loading)
    return <div className="text-center text-gray-600 animate-pulse">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Commandes du Jour</h1>

      {Object.keys(ordersByStore).length === 0 ? (
        <div className="text-center text-gray-500">Aucune commande trouvée pour aujourd'hui.</div>
      ) : (
        Object.entries(ordersByStore).map(([store, orders]) => {
          // Calculer le total des ventes pour ce store
          const totalForStore = orders.reduce((sum, order) => sum + order.total, 0);

          return (
            <div key={store} className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Store #{store}</h2>
              <div className="bg-white shadow-md rounded-lg p-6">
                <table className="table-auto w-full text-left border-separate border-spacing-0.5">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 border border-gray-300">#</th>
                      <th className="py-2 px-4 border border-gray-300">ID Commande</th>
                      <th className="py-2 px-4 border border-gray-300">Client</th>
                      <th className="py-2 px-4 border border-gray-300">Total</th>
                      <th className="py-2 px-4 border border-gray-300">Status</th>
                      <th className="py-2 px-4 border border-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        index={index}
                        onSelect={() => setSelectedOrder(order)} // Ouvrir la modale avec les détails
                      />
                    ))}
                  </tbody>
                </table>
                <div className="text-right font-bold text-lg mt-4">
                  Total des ventes pour le store {store} :{" "}
                  {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(totalForStore)}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Modale pour les détails de la commande */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)} // Fermer la modale
        />
      )}
    </div>
  );
};

const OrderRow = ({ order, index, onSelect }) => (
  <tr className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : ""}`}>
    <td className="py-2 px-4">{index + 1}</td>
    <td className="py-2 px-4">{order.id}</td>
    <td className="py-2 px-4">{order.customer_name}</td>
    <td className="py-2 px-4">
      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(order.total)}
    </td>
    <td className="py-2 px-4">
      <span className={`${getStatusClass(order.order_status)} font-bold`}>
        {getOrderStatus(order.order_status)}
      </span>
    </td>
    <td className="py-2 px-4">
      <button
        onClick={onSelect}
        className="bg-blue-500 text-white py-2 px-4 rounded transition-transform transform hover:scale-105 hover:bg-blue-700"
      >
        Voir
      </button>
    </td>
  </tr>
);

const OrderDetailsModal = ({ order, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 w-96 shadow-xl transform transition-transform scale-95 hover:scale-100">
      <h2 className="text-lg font-bold mb-4">Détails de la Commande</h2>
      <p><strong>ID Commande :</strong> {order.id}</p>
      <p><strong>Client :</strong> {order.customer_name}</p>
      <p>
        <strong>Total :</strong>{" "}
        {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(order.total)}
      </p>
      <h3 className="font-semibold mt-4 mb-2">Produits :</h3>
      <ul className="list-disc pl-6">
        {order.products.length > 0 ? ( 
          order.products.map((product, index) => (
            <li key={index}>
              <strong>ID Produit :</strong> {product.product_id || "Non spécifié"},
              <strong> Nom du produit :</strong> {product.product_name || "Non spécifié"},
              <strong> Quantité :</strong> {product.quantity || 0},
              <strong> Prix Unitaire :</strong>{" "}
              {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "MAD" }).format(Number(product.unitcost))}
            </li>
          ))
        ) : (
          <li>Aucun produit trouvé pour cette commande.</li>
        )}
      </ul>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
);

const getOrderStatus = (status) => (status === 1 ? "Complete" : "Pending");
const getStatusClass = (status) => (status === 1 ? "text-green-600" : "text-yellow-600");

export default VenteJour;
