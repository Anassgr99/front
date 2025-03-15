import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../../context/ThemeContext";

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // Navigate after successful update
  const { theme } = useContext(ThemeContext);

  // Initial product state
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    code: "",
    quantity: "",
    buying_price: "",
    selling_price: "",
    quantity_alert: "",
    tax: "null",
    tax_type: "null",
    notes: "null",
    product_image: "null",
    category_id: "",
    unit_id: "Null",
  });
  const [units, setUnits] = useState([]); // State to store units data
  const [category, setCategory] = useState([]); // State to store units data

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://5.189.179.133:3000/api/products/${id}`
        );
        setProduct(response.data); // Update state with fetched data
        //console.log(response.data);

        //console.log("Product fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to fetch product. Please try again.");
      }
    };
    const fetchUnits = async () => {
      try {
        const response = await axios.get("http://5.189.179.133:3000/api/unit/");
        setUnits(response.data); // Set the units state with the fetched data
      } catch (error) {
        console.error("Error fetching units:", error);
        // alert("Failed to fetch units. Please try again.");
      }
    };
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://5.189.179.133:3000/api/categorys/");
        setCategory(response.data); // Set the units state with the fetched data
      } catch (error) {
        console.error("Error fetching units:", error);
        // alert("Failed to fetch units. Please try again.");
      }
    };

    fetchCategory();
    fetchProduct();
    fetchUnits();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value }); // Update the corresponding field
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Créer un objet sans les champs à exclure
    const {
      id,
      created_at,
      updated_at,
      category_name,
      unit_name,
      ...productToUpdate
    } = product;
    //console.log("data", product);

    try {
      const response = await axios.put(
        `http://5.189.179.133:3000/api/products/${id}`,
        productToUpdate
      );
      //console.log("Product updated successfully:", response);
      alert("Product updated successfully!");
      navigate("/products"); // Redirect to the product list
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`shadow-lg rounded-lg p-8 w-full max-w-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
    <h1 className="text-2xl font-bold mb-6">Modifier le produit</h1>

    <form
      onSubmit={handleSubmit}
      className={`max-w-4xl mx-auto p-6 shadow-md rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Nom:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* Slug */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Slug:</label>
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* Code */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Code:</label>
          <input
            type="text"
            name="code"
            value={product.code}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
          />
        </div>

        {/* Quantity */}
        {/* <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Quantité:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
            required
          />
        </div> */}

        {/* Buying Price */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Prix d'achat:</label>
          <input
            type="number"
            name="buying_price"
            value={product.buying_price}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* Selling Price */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Prix de vente:</label>
          <input
            type="number"
            name="selling_price"
            value={product.selling_price}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* Quantity Alert */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Alerte de quantité:</label>
          <input
            type="number"
            name="quantity_alert"
            value={product.quantity_alert}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* Category ID */}
        <div className="flex flex-col">
          <label className="text-lg font-medium mb-2">Catégorie:</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            className={`border-2 rounded-lg p-2 ${theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-300'}`}
          >
            <option value="">Selectioner Catégorie</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.slug}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg w-full hover:bg-blue-600 transition"
      >
        Mettre à jour le produit
      </button>
    </form>
  </div>
  </div>
  );
};

export default EditProduct;


