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
          axios.get("http://5.189.179.133:3000/api/stores"),
          axios.get("http://5.189.179.133:3000/api/categorys"),
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
      const productRes = await axios.post("http://5.189.179.133:3000/api/products", productData);
      
      // Create a store-product association
      const storeProductData = {
        store_id: productData.store_id,
        product_id: productRes.data.productId.insertId, // Use the productId from the response
        quantity: parseInt(productData.quantity), // Convert to number
      };
      
      await axios.post("http://5.189.179.133:3000/api/store-products/add", storeProductData);
      
      // Close modal
      closeModal();
      
      // Refresh the page
      window.location.reload();
    } catch (error) {
      console.error("Error during product submission:", error);
      window.location.reload(); // Optionally refresh even on error
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
            <h2 className="text-2xl font-bold mb-4">Ajouter un produit</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
              {[
                { label: "Nom du produit", name: "name", type: "text" },
                { label: "Slug", name: "slug", type: "text" },
                { label: "Code", name: "code", type: "text" },
                { label: "Quantité", name: "quantity", type: "number" },
                { label: "Prix d'achat", name: "buying_price", type: "number" },
                { label: "Prix de vente", name: "selling_price", type: "number" },
                { label: "Alerte de quantité", name: "quantity_alert", type: "number" },
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
                <label htmlFor="category_id" className="block text-sm font-medium">Catégorie</label>
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
                >Annuler</button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >Ajouter un produit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;












// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FiPlus } from "react-icons/fi";
// import { ThemeContext } from "../../context/ThemeContext";

// const AddProduct = () => {
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [stores, setStores] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [validationErrors, setValidationErrors] = useState({});
  
//   const initialProductState = {
//     name: "",
//     slug: "",
//     code: "",
//     quantity: 0,
//     buying_price: 0,
//     selling_price: 0,
//     quantity_alert: 0,
//     tax: 0,
//     tax_type: 0,
//     notes: "",
//     product_image: "",
//     category_id: "",
//     unit_id: 2,
//   };

//   const [productData, setProductData] = useState(initialProductState);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [storesRes, categoriesRes] = await Promise.all([
//           axios.get("http://5.189.179.133:3000/api/stores"),
//           axios.get("http://5.189.179.133:3000/api/categorys"),
//         ]);
//         setStores(storesRes.data);
//         setCategories(categoriesRes.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const validateForm = () => {
//     const errors = {};
//     if (!productData.name.trim()) errors.name = "Name is required";
//     if (!productData.code.trim()) errors.code = "Code is required";
//     if (!productData.category_id) errors.category_id = "Category is required";
//     if (productData.quantity < 0) errors.quantity = "Invalid quantity";
//     setValidationErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData(prev => ({
//       ...prev,
//       [name]: name.includes("_price") || name === "quantity" ? Number(value) : value
//     }));
//     // Clear validation error when field changes
//     if (validationErrors[name]) {
//       setValidationErrors(prev => ({ ...prev, [name]: "" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     try {
//       const response = await axios.post(
//         "http://5.189.179.133:3000/api/products",
//         productData
//       );

//       if (response.data && response.data.productId) {
//         navigate("/products");
//         closeModal();
//       }
//     } catch (error) {
//       console.error("Product creation failed:", error);
//       alert("Failed to create product. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setProductData(initialProductState);
//     setValidationErrors({});
//     document.body.style.overflow = "auto";
//   };

//   const inputFields = [
//     { label: "Nom du produit", name: "name", type: "text", required: true },
//     { label: "Slug", name: "slug", type: "text" },
//     { label: "Code", name: "code", type: "text", required: true },
//     { label: "Quantité", name: "quantity", type: "number", min: 0 },
//     { label: "Prix d'achat", name: "buying_price", type: "number", min: 0 },
//     { label: "Prix de vente", name: "selling_price", type: "number", min: 0 },
//     { label: "Alerte de quantité", name: "quantity_alert", type: "number", min: 0 },
//   ];

//   return (
//     <div className="p-3">
//       <button
//         onClick={openModal}
//         className={`flex items-center py-2 px-6 rounded-lg shadow-md transition-all ${
//           theme === "dark"
//             ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
//             : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
//         }`}
//       >
//         <FiPlus className="mr-2" size={20} />
//         Ajouter Produit
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
//           <div className={`rounded-lg shadow-lg p-6 w-full max-w-3xl ${
//             theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
//           }`}>
//             <h2 className="text-2xl font-bold mb-4">Ajouter un produit</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
//               {inputFields.map(({ label, name, type, required, min }) => (
//                 <div key={name}>
//                   <label htmlFor={name} className="block text-sm font-medium">
//                     {label}
//                     {required && <span className="text-red-500">*</span>}
//                   </label>
//                   <input
//                     type={type}
//                     id={name}
//                     name={name}
//                     value={productData[name]}
//                     onChange={handleChange}
//                     min={min}
//                     className={`border px-3 py-2 w-full rounded ${
//                       theme === "dark" 
//                         ? "bg-gray-800 text-white border-gray-700" 
//                         : "bg-white text-black border-gray-300"
//                     } ${
//                       validationErrors[name] ? "border-red-500" : ""
//                     }`}
//                   />
//                   {validationErrors[name] && (
//                     <span className="text-red-500 text-sm">
//                       {validationErrors[name]}
//                     </span>
//                   )}
//                 </div>
//               ))}

//               <div>
//                 <label htmlFor="category_id" className="block text-sm font-medium">
//                   Catégorie <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   id="category_id"
//                   name="category_id"
//                   value={productData.category_id}
//                   onChange={handleChange}
//                   className={`border px-3 py-2 w-full rounded ${
//                     theme === "dark" 
//                       ? "bg-gray-800 text-white border-gray-700" 
//                       : "bg-white text-black border-gray-300"
//                   } ${validationErrors.category_id ? "border-red-500" : ""}`}
//                 >
//                   <option value="">Sélectionner une catégorie</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.slug}
//                     </option>
//                   ))}
//                 </select>
//                 {validationErrors.category_id && (
//                   <span className="text-red-500 text-sm">
//                     {validationErrors.category_id}
//                   </span>
//                 )}
//               </div>

//               <div className="flex justify-end space-x-2 col-span-3 mt-4">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="px-4 py-2 rounded bg-gray-500 text-white hover:bg-gray-600"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? "Création en cours..." : "Ajouter un produit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddProduct;