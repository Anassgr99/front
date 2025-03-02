import React, { useState, useEffect, useContext } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { ThemeContext } from "../context/ThemeContext";

const Purchases = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/returns");
        setReturns(response.data.data);
      } catch (error) {
        console.error("Error fetching returns data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name_produit", header: "Nom de produit" },
    { accessorKey: "name_user", header: "Nom d'employer" },
    { accessorKey: "quantity", header: "Quantité" },
    {
      accessorKey: "return_date",
      header: "date de retour",
      Cell: ({ row }) => new Date(row.original.return_date).toLocaleString(),
    },
    { accessorKey: "store_name", header: "Nom de Magasine" },
    { accessorKey: "note", header: "Note" },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

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
            Produits retournés
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
            data={returns}
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
      </div>
    </>
  );
};

export default Purchases;
