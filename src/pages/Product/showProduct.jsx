import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiX } from "react-icons/fi";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);
  console.log(product);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto  p-8">
      <h1 className="text-2xl font-bold mb-6">Détails du produit</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-12  gap-4">
        {/* Product Image Section (4 columns) */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <img
              src={product.image || "https://via.placeholder.com/300"} // Replace with actual image field if available
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Product Data Section (8 columns) */}
        {/* Product Data Section (8 columns) */}
        <div className="col-span-12 md:col-span-8">
          {/* Product Data in Table-like Format */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <table className="table-auto w-full">
              <tbody>
                {/* Product Name */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">Nom:</td>
                  <td className="text-gray-600 py-2">{product.name}</td>
                </tr>

                {/* Product Slug */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">Slug:</td>
                  <td className="text-gray-600 py-2">{product.slug}</td>
                </tr>

                {/* Product Code */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">
                    Code de Produit :
                  </td>
                  <td className="text-gray-600 py-2">{product.code}</td>
                </tr>

                {/* Quantity */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">Quantité:</td>
                  <td className="text-gray-600 py-2">{product.quantity}</td>
                </tr>

                {/* Buying Price */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">
                    Prix d'achat:
                  </td>
                  <td className="text-gray-600 py-2">
                    ${product.buying_price}
                  </td>
                </tr>

                {/* Selling Price */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">
                    Prix de vente:
                  </td>
                  <td className="text-gray-600 py-2">
                    ${product.selling_price}
                  </td>
                </tr>

                {/* Quantity Alert */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">
                    Alerte de quantité:
                  </td>
                  <td className="text-gray-600 py-2">
                    <span className="text-red-600 bg-red-300 p-1 text-sm rounded-lg">
                      {product.quantity_alert}
                    </span>
                  </td>
                </tr>

                {/* Tax */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">Tax:</td>
                  <td className="text-gray-600 py-2">{product.tax} %</td>
                </tr>

                {/* Tax Type */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">Type de Tax:</td>
                  <td className="text-gray-600 py-2">{product.tax_type}</td>
                </tr>

                {/* Notes */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">Notes:</td>
                  <td className="text-gray-600 py-2">
                    {product.notes || "No notes available."}
                  </td>
                </tr>

                {/* Product Image */}
                {/* <tr className="border-b">
                    <td className="font-bold text-gray-700 py-2">
                        Product Image:
                    </td>
                    <td className="text-gray-600 py-2">
                        <img
                        src={product.product_image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg"
                        />
                    </td>
                    </tr> */}

                {/* Category ID */}
                <tr className="border-b">
                  <td className="font-bold text-gray-700 py-2">
                    Nom de Catégorie:
                  </td>
                  <td className="text-blue-900  py-2">
                    <span className="bg-blue-300 text-sm font-mono font-bold p-1 rounded-xl">
                      {product.category_name}
                    </span>
                  </td>
                </tr>

                {/* Unit ID */}
                <tr>
                  <td className="font-bold text-gray-700 py-2">Nom d'Unité:</td>
                  <td className="text-blue-900 py-2">
                    <span className="bg-blue-300 text-sm font-mono font-bold p-1 rounded-xl">
                      {product.unit_name}
                    </span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td></td>
                  <td className="flex justify-end gap-4">
                    {/* Edit Button */}
                    <Link
                      to={`/editProduct/${product.id}`}
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition"
                    >
                      <FiEdit className="mr-2" />
                      Modifier
                    </Link>

                    {/* Cancel Button */}
                    <Link
                      to={`/products`}
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
                    >
                      <FiX className="mr-2" />
                      Annuler
                    </Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
