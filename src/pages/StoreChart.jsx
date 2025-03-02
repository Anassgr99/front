import React, { useState, useEffect, useContext, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ThemeContext } from "../context/ThemeContext";

// Helper function to get the last 12 months
const getLast12Months = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  }).reverse();
};

const StoreChart = () => {
  const { theme } = useContext(ThemeContext);
  const [storeOrdersData, setStoreOrdersData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  console.log(topProducts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders");
        const data = await response.json();

        if (Array.isArray(data)) {
          // Ensure data is an array
          setStoreOrdersData(data);
          calculateTopProducts(data);
        } else {
          console.error("Invalid data format:", data);
          setStoreOrdersData([]); // Prevent undefined state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setStoreOrdersData([]); // Prevent undefined state
      }
    };

    fetchData();
  }, []);

  const last12Months = useMemo(() => getLast12Months(), []);

  // Aggregate orders by month and store
  const aggregatedData = useMemo(() => {
    const dataMap = new Map(last12Months.map((month) => [month, {}]));

    storeOrdersData.forEach(({ store_name, order_date }) => {
      const orderMonth = new Date(order_date).toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (dataMap.has(orderMonth)) {
        dataMap.get(orderMonth)[store_name] =
          (dataMap.get(orderMonth)[store_name] || 0) + 1;
      }
    });

    return last12Months.map((month) => ({ month, stores: dataMap.get(month) }));
  }, [storeOrdersData, last12Months]);

  // Calculate top products
  const calculateTopProducts = (orders) => {
    const productSales = {};

    orders.forEach(({ product_name, store_name, quantity }) => {
      if (product_name && store_name) {
        productSales[store_name] = productSales[store_name] || {};
        productSales[store_name][product_name] = productSales[store_name][
          product_name
        ] || {
          totalSales: 0,
          quantity: 0,
        };

        productSales[store_name][product_name].totalSales += 1;
        productSales[store_name][product_name].quantity += Number(quantity); // Ensure quantity is a number
      }
    });

    const sortedProducts = Object.entries(productSales).flatMap(
      ([storeName, products]) =>
        Object.entries(products)
          .sort((a, b) => b[1].totalSales - a[1].totalSales)
          .slice(0, 10)
          .map(([productName, { totalSales, quantity }]) => ({
            storeName,
            productName,
            totalSales,
            quantity,
          }))
    );

    setTopProducts(sortedProducts);
  };

  // Prepare chart data
  const storeNames = storeOrdersData?.length
    ? [...new Set(storeOrdersData.map((order) => order.store_name))]
    : [];

  const chartSeries = useMemo(
    () =>
      storeNames.map((storeName) => ({
        name: storeName,
        data: aggregatedData.map(
          (monthData) => monthData.stores[storeName] || 0
        ),
      })),
    [storeNames, aggregatedData]
  );

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 350,
        stacked: false,
        background: theme === "dark" ? "#1F2937" : "#FFFFFF",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: {
        categories: last12Months,
        labels: { style: { colors: theme === "dark" ? "#E5E7EB" : "#333" } },
      },
      yaxis: {
        labels: { style: { colors: theme === "dark" ? "#FFFFFF" : "#000000" } },
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        fontSize: "14px",
        fontWeight: 500,
        markers: { width: 12, height: 12, radius: 12 },
        labels: { colors: theme === "dark" ? "#E5E7EB" : "#333" },
        itemMargin: { horizontal: 10, vertical: 5 },
      },
      tooltip: {
        theme,
        style: {
          fontSize: "13px",
          background: theme === "dark" ? "#374151" : "#FFFFFF",
          color: theme === "dark" ? "#E5E7EB" : "#333",
        },
        y: { formatter: (val) => `${val} orders` },
      },
    }),
    [theme, last12Months]
  );

  const getBarColor = (quantity) =>
    quantity <= 30
      ? "bg-red-500"
      : quantity <= 70
      ? "bg-orange-500"
      : "bg-green-500";

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Bar Chart Section */}
      <div
        className={`col-span-7  ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        } shadow-lg rounded-lg`}
      >
        <h3 className="text-lg p-4 rounded-t-xl  font-medium">
          Aperçu Mensuel des Commandes du Magasin
        </h3>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      </div>

      {/* Top Products Table */}
      <div
        className={`col-span-5  ${
          theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-gray-800"
        } shadow-lg rounded-lg`}
      >
        <h3 className="text-lg p-4 rounded-t-xl  font-medium">
        Top 10 des Produits Vendus
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full  dark:border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gradient-to-r from-gray-500 to-gray-500 text-white">
                {["Product Name", "Total Sales", "Store Name", "Quantity"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold uppercase"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topProducts.map(
                ({ productName, totalSales, storeName, quantity }, index) => {
                  // Ranking Icons (Gold, Silver, Bronze)
                  const rankIcons = [
                    { color: "gold", tooltip: "🥇 1st Place" },
                    { color: "silver", tooltip: "🥈 2nd Place" },
                    { color: "#cd7f32", tooltip: "🥉 3rd Place" },
                  ];
                  const rankIcon = index < 3 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill={rankIcons[index].color}
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                      title={rankIcons[index].tooltip}
                    >
                      <path d="M3.612 15.443c-.396.392-.886-.216-.473-.808L7.536 10.7 1.365 7.426c-.434-.307-.148-.927.433-.927h5.37l1.872-5.276a.495.495 0 0 1 .904 0l1.873 5.276h5.37c.581 0 .867.62.433.927l-6.17 3.274 4.397 3.935c.413.592-.077 1.2-.473.808l-6.171-4.732-2.945 4.935a.496.496 0 0 1-.904 0z" />
                    </svg>
                  );

                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gray-50 hover:text-black dark:hover:bg-gray-700 transition duration-300 ${
                        theme === "dark"
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm font-medium">
                        {productName}
                      </td>
                      <td className="px-6 py-4 text-sm flex items-center space-x-2">
                        {rankIcon}
                        <span>{totalSales}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">{storeName}</td>
                      <td className="px-6 py-4 text-sm">{quantity}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StoreChart;
