import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Login from "./components/Login";
import IsUser from "./pages/IsUser.jsx";
import HomeStore from "./user/HomeStore";
import { ThemeProvider } from "./context/ThemeContext";

// Lazy loading for better performance
const Dashboard = lazy(() => import("./components/Dashboard"));
const Products = lazy(() => import("./pages/Product/Products"));
const Orders = lazy(() => import("./pages/Order/Orders"));
const Purchases = lazy(() => import("./pages/Purchases"));
const ShowProduct = lazy(() => import("./pages/Product/showProduct"));
const EditProduct = lazy(() => import("./pages/Product/editProduct"));
const ShowOrder = lazy(() => import("./pages/Order/showOrder"));
const Customer = lazy(() => import("./pages/Customer/Customer"));
const ShowCustomer = lazy(() => import("./pages/Customer/showCustomer"));
const EditCustomer = lazy(() => import("./pages/Customer/editCustomer"));
const AddCustomer = lazy(() => import("./pages/Customer/addCustomer"));
const PrintOrder = lazy(() => import("./pages/Order/PrintOrder"));
const StoreProductTable = lazy(() => import("./pages/store"));
const Ventejour = lazy(() => import("./pages/Ventejour"));
const EditOrder = lazy(() => import("./pages/Order/EditOrder"));
const Showcategories = lazy(() => import("./pages/Category/Showcategories"));
const EditCategory = lazy(() => import("./pages/Category/EditCategory"));
const User = lazy(() => import("./pages/User/User"));
const ShowUser = lazy(() => import("./pages/User/showUser"));
const EditUser = lazy(() => import("./pages/User/EditUser"));
const UploadExcel = lazy(() => import("./pages/Product/Excel/Excel"));

// Define Admin Routes
const adminRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/products", element: <Products /> },
  { path: "/uploadExcel", element: <UploadExcel /> },
  { path: "/customer", element: <Customer /> },
  { path: "/showCustomer/:id", element: <ShowCustomer /> },
  { path: "/editCustomer/:id", element: <EditCustomer /> },
  { path: "/addCustomer", element: <AddCustomer /> },
  { path: "/print/:orderId", element: <PrintOrder /> },
  { path: "/orders", element: <Orders /> },
  { path: "/purchases", element: <Purchases /> },
  { path: "/store", element: <StoreProductTable /> },
  { path: "/ventejour", element: <Ventejour /> },
  { path: "/showProduct/:id", element: <ShowProduct /> },
  { path: "/editProduct/:id", element: <EditProduct /> },
  { path: "/editOrder/:id", element: <EditOrder /> },
  { path: "/editCategory/:id", element: <EditCategory /> },
  { path: "/user", element: <User /> },
  { path: "/showUser/:id", element: <ShowUser /> },
  { path: "/editUser/:id", element: <EditUser /> },
  { path: "/Showcategories", element: <Showcategories /> },
  { path: "/showOrders/:id", element: <ShowOrder /> },
];

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes (Protected) */}
            {adminRoutes.map(({ path, element }) => (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    <Layout>{element}</Layout>
                  </PrivateRoute>
                }
              />
            ))}

            {/* Normal User Routes */}
            <Route path="/isUser/:id" element={<IsUser />} />
            <Route path="/isStore" element={<HomeStore />} />

            {/* Catch-All Route */}
            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
