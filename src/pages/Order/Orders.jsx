import React, { useContext, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiPrinter, FiTrash2, FiEdit2 } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

const Orders = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://192.168.1.7:3000/api/Orders");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://192.168.1.7:3000/api/Orders/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  const columns = [
    { accessorKey: "invoice_no", header: "Invoice N°" },
    { accessorKey: "customer_name", header: "Client Name" },
    {
      accessorKey: "order_status",
      header: "Order Status",
      Cell: ({ cell }) => {
        const status = cell.getValue();
        const statusStyles = {
          Pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
          Completed: "bg-green-100 text-green-800 border-green-300",
          Cancelled: "bg-red-100 text-red-800 border-red-300",
          default: "bg-gray-100 text-gray-800 border-gray-300",
        };

        return (
          <span
            className={`px-3 py-1 rounded-md border ${
              statusStyles[status] || statusStyles.default
            }`}
            style={{
              fontWeight: "bold",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {status}
          </span>
        );
      },
    },
    { accessorKey: "order_date", header: "Order Date" },
    {
      accessorKey: "payment_type",
      header: "Type de paiement",
      Cell: ({ cell }) => {
        const payment = cell.getValue();
        const paymentStyles = {
          Cash: "bg-green-100 text-green-800 border-green-300",
          Credit: "bg-red-100 text-red-800 border-red-300",
          default: "bg-gray-100 text-gray-800 border-gray-300",
        };

        return (
          <span
            className={`px-3 py-1 rounded-md border ${
              paymentStyles[payment] || paymentStyles.default
            }`}
            style={{
              fontWeight: "bold",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {payment}
          </span>
        );
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      Cell: ({ row }) => (
        <p className="font-semibold">{row.original.total} DH</p>
      ),
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/showOrders/${row.original.id}`)}
            className="px-3 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg flex items-center gap-2 shadow-md transition-all"
          >
            <FiEye />
            Afficher
          </button>
          <button
            onClick={() => navigate(`/editOrder/${row.original.id}`)}
            className="px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2 shadow-md transition-all"
          >
            <FiEdit2 />
            Modifier
          </button>
          <button
            onClick={() => navigate(`/print/${row.original.id}`)}
            className="px-3 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg flex items-center gap-2 shadow-md transition-all"
          >
            <FiPrinter />
            Print
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="">
        <div
          className={`col-span-12  ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-800"
          } shadow-lg `}
        >
          <h3 className="text-lg p-4 rounded-t-xl  font-medium">
            Liste des commande{" "}
          </h3>
        </div>

        <div
          className={`col-span-12 p-4  ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-800"
          } shadow-lg `}
        >
          <MaterialReactTable
            columns={columns}
            data={products}
            enableStickyHeader
            enableRowNumbers
            muiTableContainerProps={{
              sx: {
                backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                // borderRadius: "12px",
                overflow: "auto",
              },
            }}
            muiTableBodyCellProps={{
              sx: {
                fontSize: "14px",
                padding: "12px",
                backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
            }}
            muiTableHeadCellProps={{
              sx: {
                fontWeight: "bold",
                fontSize: "16px",
                padding: "14px",
                backgroundColor: theme === "dark" ? "#1F2937" : "#F3F4F6",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
            }}
            muiColumnActionsButtonProps={{
              sx: {
                backgroundColor: theme === "dark" ? "#111827" : "#F3F4F6",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
            }}
            muiTopToolbarProps={{
              sx: {
                backgroundColor: theme === "dark" ? "#305ab0" : "#F3F4F6",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
                // borderRadius: "12px",
              },
            }}
            muiBottomToolbarProps={{
              sx: {
                backgroundColor: theme === "dark" ? "#305ab0" : "#F3F4F6",
                color: theme === "dark" ? "#F9FAFB" : "#1F2937",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Orders;
