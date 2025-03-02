import React, { useState, useEffect, useContext, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { FiShoppingCart, FiPackage, FiUsers, FiUser } from "react-icons/fi";
import StoreChart from "../pages/StoreChart";
import { ThemeContext } from "../context/ThemeContext";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [data, setData] = useState({
    products: [],
    orders: [],
    customers: [],
    users: [],
  });
  console.log(data.products);

  const [storeFilter, setStoreFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          "http://192.168.1.7:3000/api/products",
          "http://192.168.1.7:3000/api/orders",
          "http://192.168.1.7:3000/api/customers",
          "http://192.168.1.7:3000/api/users",
        ];
        const [products, orders, customers, users] = await Promise.all(
          urls.map((url) => fetch(url).then((res) => res.json()))
        );
        setData({ products, orders, customers, users });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const lowStockSeries = useMemo(
    () => [
      {
        name: "Stock",
        data: data.products.map((item) => item.quantity),
      },
    ],
    [data.products]
  );

  const orderSeries = useMemo(
    () => [
      {
        name: "Orders",
        data: data.orders.map((order) => order.total),
      },
    ],
    [data.orders]
  );

  const cards = [
    {
      icon: <FiShoppingCart />,
      title: "Total Orders",
      value: data.orders.length,
      color: "text-blue-500",
    },
    {
      icon: <FiPackage />,
      title: "Total Products",
      value: data.products.length,
      color: "text-red-500",
    },
    {
      icon: <FiUsers />,
      title: "Total Customers",
      value: data.customers.length,
      color: "text-orange-500",
    },
    {
      icon: <FiUser />,
      title: "Total Users",
      value: data.users.length,
      color: "text-green-500",
    },
  ];
  const filteredProducts = storeFilter
    ? data.products.filter((product) => product.store_id === storeFilter)
    : data.products;
  return (
    <div
      className={`p-6 transition-all ${
        theme === "dark"
          ? "bg-gray-900 text-white hover:shadow-lg"
          : "bg-gray-100   text-gray-900  hover:shadow-lg"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((item, index) => (
            <div
              key={index}
              className={` transition-all shadow-md rounded-lg p-6 flex items-center ${
                theme === "dark"
                  ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
                  : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
              }`}
            >
              <div className={`${item.color} text-4xl mr-4`}>{item.icon}</div>
              <div>
                <h3
                  className={`text-xl font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-lg font-bold ${
                    theme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div
          className={`col-span-8 shadow-lg rounded-lg p-4 transition-all ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">Stock de Produits</h3>
          <div className="mt-2  flex border-b-2 p-3 gap-2 mb-2 ">
            <button
              className={`px-6 border cursor-pointer rounded ${
                theme === "dark"
                  ? "text-white  bg-gray-700"
                  : "text-black   bg-gray-200"
              }`}
              onClick={() => setStoreFilter(1)}
            >
              Store 1
            </button>
            <button
              className={`px-6 border cursor-pointer rounded ${
                theme === "dark"
                  ? "text-white bg-gray-700"
                  : "text-black bg-gray-200"
              }`}
              onClick={() => setStoreFilter(2)}
            >
              Store 2
            </button>
            <button
              className={`px-6 py-1 border cursor-pointer rounded ${
                theme === "dark"
                  ? "text-white cursor-pointer bg-gray-700"
                  : "text-black cursor-pointer bg-gray-200"
              }`}
              onClick={() => setStoreFilter(3)}
            >
              Store 3
            </button>
          </div>
          <div className="grid grid-cols-1 overflow-auto h-[300px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className={`shadow-md rounded-lg p-2 items-center gap-3 transition-all ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-[10px] mr-2 font-semibold">
                      {product.name}
                    </h4>
                    {/* <p className="text-[10px]">Store ID: {product.store_id}</p> */}
                  </div>
                  <div>
                    <span
                      className={`text-xs font-semibold ${
                        product.quantity > product.quantity_alert
                          ? "bg-green-200 text-green-700 rounded-xl"
                          : ""
                      }`}
                    >
                      {product.quantity > product.quantity_alert ? (
                        <FaArrowUp className="bg-green-200 text-green-700 rounded-xl" />
                      ) : (
                        <FaArrowDown className="bg-red-200 text-red-700 rounded-xl" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`col-span-4 shadow-md rounded-lg p-4 transition-all ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <h3 className="text-lg font-semibold">Liste des commandes</h3>
          <ReactApexChart
            options={{
              chart: {
                background: theme === "dark" ? "#1F2937" : "#FFFFFF", // Dark mode background
              },
              legend: {
                labels: {
                  colors: theme === "dark" ? "#FFFFFF" : "#000000", // Legend text color
                },
              },
              xaxis: {
                categories: data.orders.map(
                  (o) => new Date(o.order_date).toISOString().split("T")[0]
                ),
                labels: {
                  style: {
                    colors: theme === "dark" ? "#FFFFFF" : "#000000", // X-axis labels color
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: theme === "dark" ? "#FFFFFF" : "#000000", // Y-axis labels color
                  },
                },
              },
              tooltip: {
                theme: theme, // Applies dark/light mode to tooltips
              },
            }}
            series={orderSeries}
            type="line"
            height={300}
          />
        </div>

        <div className="col-span-12 shadow-md rounded-lg p-4">
          {/* <h3 className="text-lg font-semibold">Aperçu du Magasin</h3> */}
          <StoreChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
