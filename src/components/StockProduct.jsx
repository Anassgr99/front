import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const StockProduct = () => {
  const { theme } = useContext(ThemeContext);
  const [selectedStore, setSelectedStore] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(
          "http://5.189.179.133:3000/api/store-products"
        );
        setStockData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  const getBgClass = (qty) => {
    if (qty > 200)
      return "bg-green-700 text-white hover:bg-green-800 transition shadow-md";
    if (qty > 100)
      return "bg-orange-500 text-white hover:bg-orange-600 transition shadow-md";
    return "bg-red-600 text-white hover:bg-red-700 transition shadow-md";
  };

  const groupedData = stockData.reduce((acc, item) => {
    if (!acc[item.product_id]) {
      acc[item.product_id] = {
        product_name: item.product_name,
        total: 0,
        stores: {},
      };
    }
    acc[item.product_id].stores[item.store_name] = item.quantity;
    acc[item.product_id].total += item.quantity;
    return acc;
  }, {});

  const formattedData = Object.entries(groupedData).map(
    ([product_id, data]) => ({
      product_id,
      ...data,
    })
  );

  const storeNames = [...new Set(stockData.map((item) => item.store_name))];

  const sortedData = [...formattedData].sort((a, b) => {
    if (selectedStore === "all") return 0;
    return sortOrder === "asc"
      ? (a.stores[selectedStore] || 0) - (b.stores[selectedStore] || 0)
      : (b.stores[selectedStore] || 0) - (a.stores[selectedStore] || 0);
  });

  return (
    <div className="overflow-y-auto">
      {/* Filters */}
      <div className="flex  items-start justify-start gap-4 mb-6">
        {/* Filter by Store */}
        <div
          className={`shadow-md rounded-lg p-3 transition ${
            theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <label className="mr-2 font-semibold">🏬 Filter by store:</label>
          <select
            className={`p-2 border rounded cursor-pointer shadow-md transition ${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-white text-black"
            }`}
            onChange={(e) => setSelectedStore(e.target.value)}
            value={selectedStore}
          >
            <option value="all">All Stores</option>
            {storeNames.map((store, index) => (
              <option key={index} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by QTS */}
        {selectedStore !== "all" && (
          <div
            className={`shadow-md rounded-lg p-3 transition ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <label className="mr-2 font-semibold">🔢 Sort by QTS:</label>
            <button
              className={`p-2 border rounded flex items-center gap-2 shadow-md transition ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-300 hover:bg-gray-400 text-black"
              }`}
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr
              className={`${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <th className="px-6 py-3 border">📌 Product</th>
              {selectedStore === "all" ? (
                storeNames.map((store, index) => (
                  <th key={index} className="px-6 py-3 border">
                    {store}
                  </th>
                ))
              ) : (
                <th className="px-6 py-3 border">{selectedStore}</th>
              )}
              <th className="px-6 py-3 border">📊 Total</th>
            </tr>
          </thead>
          <tbody>
            {(selectedStore === "all" ? formattedData : sortedData).map(
              (item, index) => (
                <tr
                  key={index}
                  className={`text-center border ${
                    theme === "dark"
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-200"
                  } transition shadow-md`}
                >
                  <td className="px-6 py-3 border font-semibold">
                    {item.product_name}
                  </td>
                  {selectedStore === "all" ? (
                    storeNames.map((store, idx) => (
                      <td
                        key={idx}
                        className={`px-6 py-3 border ${getBgClass(
                          item.stores[store] || 0
                        )}`}
                      >
                        {item.stores[store] || 0}
                      </td>
                    ))
                  ) : (
                    <td
                      className={`px-6 py-3 border ${getBgClass(
                        item.stores[selectedStore] || 0
                      )}`}
                    >
                      {item.stores[selectedStore] || 0}
                    </td>
                  )}
                  <td className="px-6 py-3 border font-bold">{item.total}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockProduct;
