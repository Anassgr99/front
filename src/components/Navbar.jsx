import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiClipboard,
  FiFileText,
  FiSettings,
  FiGrid,
  FiLogOut,
  FiUser,
  FiUsers,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { FaFilter, FaStore } from "react-icons/fa";
import { ThemeContext } from '../context/ThemeContext';

import logo from "../assets/logo.png"; // Adjust path if needed

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // const [theme, setTheme] = useState("dark"); // Dark/Light theme toggle
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Menu items
  const menuItems = [
    { name: "Dashboard", icon: <FiGrid />, link: "/" },
    { name: "Produits", icon: <FiBox />, link: "/products" },
    { name: "Commandes", icon: <FiShoppingCart />, link: "/orders" },
    { name: "Produits Retournés", icon: <FiClipboard />, link: "/purchases" },
    { name: "Client", icon: <FiUsers />, link: "/customer" },
    { name: "Magasin", icon: <FaStore />, link: "/store" },
    { name: "Vente du jour", icon: <FiFileText />, link: "/ventejour" },
    { name: "Employeur", icon: <FiUser />, link: "/user" },
    { name: "Categories", icon: <FaFilter />, link: "/Showcategories" },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }    transition-all`}
    >
      {/* Navbar Header */}
      <nav className="p-2 shadow-lg   bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex justify-between items-center px-6 py-2">
          <div>
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="logo" className="w-36 h-12 object-contain" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 mr-2 bg-white rounded-full shadow-md hover:scale-110 transition-all"
            >
              {theme === "dark" ? (
                <FiSun size={24} className="text-yellow-500" />
              ) : (
                <FiMoon size={24} className="text-gray-800" />
              )}
            </button>
            <div
              className={`px-5 py-2 rounded-3xl shadow-md transition-all ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <span className="text-lg font-semibold hidden md:block">
                Admin
              </span>
            </div>

            {/* Logout Button */}
            <button
              className={`flex items-center px-5 py-2 rounded-lg shadow-md transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-red-500 hover:bg-red-600 hover:text-white"
                  : "bg-white text-red-600 hover:bg-red-600 hover:text-white"
              }`}
              onClick={handleLogout}
            >
              <span className="pr-3 font-medium">Déconnecter</span>
              <FiLogOut className="text-xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Menu Grid */}
      <div
        className={`grid gap-4 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 transition-all ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.link}
            className={`flex items-center p-4 rounded-lg shadow-md transition-all ${
              theme === "dark"
                ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
                : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
            }`}
          >
            <span
              className={`text-2xl mr-4 ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              }`}
            >
              {item.icon}
            </span>
            <span className="font-semibold">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
