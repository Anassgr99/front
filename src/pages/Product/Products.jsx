import React, { useContext, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import AddProduct from "../Product/AddProduct";
import UploadExcel from "../Product/Excel/Excel";
import { ThemeContext } from "../../context/ThemeContext";

const Products = () => {
  const [products, setProducts] = useState([]); // State to store products
  const navigate = useNavigate(); // Hook for navigation
  // console.log(products);
  const { theme } = useContext(ThemeContext);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://192.168.1.7:3000/api/products");

        setProducts(response.data); // Set fetched products
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Delete product by ID
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://192.168.1.7:3000/api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id)); // Update state
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  // Define columns for the table
  const columns = [
    {
      accessorKey: "name",
      header: "Nom de produit",
    },
    {
      accessorKey: "code",
      header: "Code de produit",
    },
    {
      accessorKey: "quantity",
      header: "Quantité",
      Cell: ({ row }) => {
        const quantity = row.original.quantity; // Current quantity
        const quantityAlert = row.original.quantity_alert; // Alert threshold

        // Determine the alert status
        let alertStatus = "";
        let alertColor = "";
        let icon = null;

        if (quantity > quantityAlert) {
          alertStatus = "Good ";
          alertColor = "bg-green-500";
          icon = <span className=" text-green-500"> </span>; // Green checkmark icon
        } else if (quantity >= quantityAlert / 2 && quantity <= quantityAlert) {
          alertStatus = "Low ";
          alertColor = "bg-yellow-500 ";
          icon = (
            <span className="fi fi-alert-circle text-blue-500">
              {" "}
              <FiAlertTriangle />
            </span>
          ); // Yellow warning icon
        } else if (quantity < quantityAlert / 2) {
          alertStatus = "Warning ";
          alertColor = "bg-red-500";
          icon = <i className="fi fi-x-circle text-red-500"></i>; // Red error icon
        }

        return (
          <div
            className={`flex items-center justify-center rounded-2xl h-7 w-7 ${alertColor} font-semibold`}
          >
            <span>{quantity}</span>
            {/* {icon} */}
          </div>
        );
      },
    },
    {
      accessorKey: "buying_price",
      header: "Prix d'achat",
    },
    {
      accessorKey: "selling_price",
      header: "Prix de vente",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/showProduct/${row.original.id}`)}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
          >
            <FiEye /> {/* Eye icon for "Show" */}
            Afficher
          </button>
          <button
            onClick={() => navigate(`/editProduct/${row.original.id}`)}
            className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg flex items-center gap-2"
          >
            <FiEdit /> {/* Edit icon for "Edit" */}
            Modifier
          </button>
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this product?")
              ) {
                deleteProduct(row.original.id);
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
  const darkModeStyles = {
    backgroundColor: "#111827",
    color: "#F9FAFB",
  };

  const lightModeStyles = {
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
  };

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
            Aperçu Mensuel des Commandes du Magasin
          </h3>
          <div className="flex justify-end space-x-2 mr-4">
            <AddProduct />
            <UploadExcel />
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
          data={products}
          enableStickyHeader
          enableRowNumbers
          muiTableContainerProps={{
            sx: {
              ...(theme === "dark" ? darkModeStyles : lightModeStyles),
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              // borderRadius: "12px",
              overflow: "hidden",
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              fontSize: "14px",
              padding: "12px",
              ...(theme === "dark" ? darkModeStyles : lightModeStyles),
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              fontWeight: "bold",
              fontSize: "16px",
              padding: "14px",
              backgroundColor: theme === "dark" ? "#111827" : "#F3F4F6",
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
              color: theme === "dark" ? "#1F2937" : "#1F2937",
            },
          }}
        />
      </div>
    </>
  );
};

export default Products;
