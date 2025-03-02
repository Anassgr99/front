import React, { useContext, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEdit, FiTrash2, FiAlertTriangle, FiPlus } from "react-icons/fi";
import AddUser from "./AddUser";
import { ThemeContext } from "../../context/ThemeContext";

export const User = () => {
  const [users, setUsers] = useState([]); // State to store users
  const navigate = useNavigate(); // Hook for navigation
  const { theme } = useContext(ThemeContext);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {   
        const response = await axios.get("http://192.168.1.7:3000/api/users");
        setUsers(response.data); // Set fetched users
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Delete user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://192.168.1.7:3000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Update state
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete the user.");
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
      header: "Nom",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "username",
      header: "Username",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "store",
      header: "Store",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          {/* <button
            onClick={() => navigate(`/showUser/${row.original.id}`)}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center gap-2"
          >
            <FiEye /> 
            Show
          </button>
          <button
            onClick={() => navigate(`/editUser/${row.original.id}`)}
            className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg flex items-center gap-2"
          >
            <FiEdit /> 
            Edit
          </button> */}
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this user?")
              ) {
                deleteUser(row.original.id);
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
         <div className="">
           <div
             className={`col-span-12  ${
               theme === "dark"
                 ? "bg-gray-900 text-white"
                 : "bg-white text-gray-800"
             } shadow-lg `}
           >
             <h3 className="text-lg p-4 rounded-t-xl  font-medium">
             Liste des Employés             </h3>
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
               data={users}
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

export default User;
