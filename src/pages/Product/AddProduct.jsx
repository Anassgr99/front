import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import UploadExcel from "./Excel/Excel";
import { ThemeContext } from "../../context/ThemeContext";

const AddProduct = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    slug: "",
    code: "",
    quantity: 0,
    buying_price: 0,
    selling_price: 0,
    quantity_alert: 0,
    tax: 0,
    tax_type: 0,
    notes: "",
    product_image: "",
    category_id: 0,
    unit_id: 2,
    store_id: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storesRes, categoriesRes] = await Promise.all([
          axios.get("http://192.168.1.7:3000/api/stores"),
          axios.get("http://192.168.1.7:3000/api/categorys"),
        ]);
        setStores(storesRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a new product
      const productRes = await axios.post("http://192.168.1.7:3000/api/products", productData);
      console.log("Product added successfully:", productData);
  
      // Create a store-product association
      const storeProductData = {
        store_id: productData.store_id,
        product_id: productRes.data.productId.insertId, // Use the productId from the response
        quantity: parseInt(productData.quantity), // Convert to number
      };
      
      console.log(storeProductData);
      
      await axios.post("http://192.168.1.7:3000/api/store-products/add", storeProductData);
      console.log("Store product added successfully:", storeProductData);
      navigate("/products");

      closeModal();
    } catch (error) {
      console.error("Error during product submission:", error);
      navigate("/products");
    }
  };
  

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="p-3">
      <button
        onClick={openModal}
        className={`flex items-center py-2 px-6 rounded-lg shadow-md transition-all ${
          theme === "dark"
            ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
            : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
        }`}
      >
        <FiPlus className="mr-2" size={20} />
        Ajouter Produit
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
          <div className={`rounded-lg shadow-lg p-6 w-full max-w-3xl ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              {[
                { label: "Product Name", name: "name", type: "text" },
                { label: "Slug", name: "slug", type: "text" },
                { label: "Code", name: "code", type: "text" },
                { label: "Quantity", name: "quantity", type: "number" },
                { label: "Buying Price", name: "buying_price", type: "number" },
                { label: "Selling Price", name: "selling_price", type: "number" },
                { label: "Quantity Alert", name: "quantity_alert", type: "number" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label htmlFor={name} className="block text-sm font-medium">{label}</label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={productData[name]}
                    onChange={handleChange}
                    className={`border px-3 py-2 w-full rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="category_id" className="block text-sm font-medium">Category</label>
                <select
                  id="category_id"
                  name="category_id"
                  value={productData.category_id}
                  onChange={handleChange}
                  className={`border px-3 py-2 w-full rounded ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                >
                  <option value="">Selectioner Produit</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.slug}</option>
                  ))}
                </select>
              </div>

             

              <div className="flex justify-end space-x-2 col-span-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >Cancel</button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >Add Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
