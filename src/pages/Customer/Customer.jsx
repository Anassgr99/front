import React, { useContext, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2, FiAlertTriangle, FiPlus } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

export const Customer = () => {
  const [customers, setCustomers] = useState([]); // State to store customers
  const navigate = useNavigate(); // Hook for navigation
  const { theme } = useContext(ThemeContext);

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/customers");

        setCustomers(response.data); // Set fetched customers
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Delete customer by ID
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/customers/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id)); // Update state
      alert("Customer deleted successfully!");
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete the customer.");
    }
  };

  // Define columns for the table
  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: "Nom de Client",
    },
    {
      accessorKey: "phone",
      header: " Numéro de téléphone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
   
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/showCustomer/${row.original.id}`)}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
          >
            <FiEye /> {/* Eye icon for "Show" */}
            Afficher
          </button>
          <button
            onClick={() => navigate(`/editCustomer/${row.original.id}`)}
            className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg flex items-center gap-2"
          >
            <FiEdit /> {/* Edit icon for "Edit" */}
            Modifier
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this customer?")
              ) {
                deleteCustomer(row.original.id);
              }
            }}
            className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2"
          >
            <FiTrash2 /> {/* Trash icon for "Delete" */}
            Supprimer
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div
          className={`col-span-12  ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-800"
          } shadow-lg `}
        >
          <h3 className="text-lg p-4 rounded-t-xl  font-medium">
            Client
          </h3>
          <div className="flex justify-end space-x-2 mr-4">
           <Link
           Link
           to="/addCustomer"
           className={`flex items-center py-2 px-6 rounded-lg shadow-md transition-all ${
            theme === "dark"
              ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
              : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
          }`}
           >
            <FiPlus className="mr-2" size={20} />
                      Ajouter Customer
           </Link>
          </div>
        </div>
      </div>
      <div
        className={`col-span-12 p-4  ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } shadow-lg `}
      >
        <MaterialReactTable
                      columns={columns}
                      data={customers}
                      enableStickyHeader
                      enableRowNumbers
                      muiTableContainerProps={{
                        sx: {
                          backgroundColor: theme === "dark" ? "#111827" : "#FFFFFF",
                          color: theme === "dark" ? "#F9FAFB" : "#1F2937",
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                          borderRadius: "12px",
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
                          backgroundColor: theme === "dark" ? "#edf6ff" : "#F3F4F6",
                          color: theme === "dark" ? "#F9FAFB" : "#1F2937",
                        },
                      }}
                      muiBottomToolbarProps={{
                        sx: {
                          backgroundColor: theme === "dark" ? "#edf6ff" : "#F3F4F6",
                          color: theme === "dark" ? "#F9FAFB" : "#1F2937",
                        },
                      }}
                    />
      </div>
    </>
  );
};

export default Customer;
