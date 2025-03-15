import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FiEdit, FiX } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";
import producticon from "../../../public/images/Product.svg";

const ShowProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://5.189.179.133:3000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
  <div className={`min-h-screen  justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
    <div
      className={`container mx-auto p-8 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        Détails du produit
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* Left section with product image or icon */}
        <div className="col-span-12 md:col-span-4">
          <div
            className={`shadow-xl rounded-lg p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            {theme === "dark" ? (
              <svg
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>product-management</title>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="icon"
                      fill="#e6d6d6"
                      transform="translate(42.666667, 34.346667)"
                    >
                      {" "}
                      <path
                        d="M426.247658,366.986259 C426.477599,368.072636 426.613335,369.17172 426.653805,370.281095 L426.666667,370.986667 L426.666667,392.32 C426.666667,415.884149 383.686003,434.986667 330.666667,434.986667 C278.177524,434.986667 235.527284,416.264289 234.679528,393.025571 L234.666667,392.32 L234.666667,370.986667 L234.679528,370.281095 C234.719905,369.174279 234.855108,368.077708 235.081684,366.992917 C240.961696,371.41162 248.119437,375.487081 256.413327,378.976167 C275.772109,387.120048 301.875889,392.32 330.666667,392.32 C360.599038,392.32 387.623237,386.691188 407.213205,377.984536 C414.535528,374.73017 420.909655,371.002541 426.247658,366.986259 Z M192,7.10542736e-15 L384,106.666667 L384.001134,185.388691 C368.274441,181.351277 350.081492,178.986667 330.666667,178.986667 C301.427978,178.986667 274.9627,184.361969 255.43909,193.039129 C228.705759,204.92061 215.096345,223.091357 213.375754,241.480019 L213.327253,242.037312 L213.449,414.75 L192,426.666667 L-2.13162821e-14,320 L-2.13162821e-14,106.666667 L192,7.10542736e-15 Z M426.247658,302.986259 C426.477599,304.072636 426.613335,305.17172 426.653805,306.281095 L426.666667,306.986667 L426.666667,328.32 C426.666667,351.884149 383.686003,370.986667 330.666667,370.986667 C278.177524,370.986667 235.527284,352.264289 234.679528,329.025571 L234.666667,328.32 L234.666667,306.986667 L234.679528,306.281095 C234.719905,305.174279 234.855108,304.077708 235.081684,302.992917 C240.961696,307.41162 248.119437,311.487081 256.413327,314.976167 C275.772109,323.120048 301.875889,328.32 330.666667,328.32 C360.599038,328.32 387.623237,322.691188 407.213205,313.984536 C414.535528,310.73017 420.909655,307.002541 426.247658,302.986259 Z M127.999,199.108 L128,343.706 L170.666667,367.410315 L170.666667,222.811016 L127.999,199.108 Z M42.6666667,151.701991 L42.6666667,296.296296 L85.333,320.001 L85.333,175.405 L42.6666667,151.701991 Z M330.666667,200.32 C383.155809,200.32 425.80605,219.042377 426.653805,242.281095 L426.666667,242.986667 L426.666667,264.32 C426.666667,287.884149 383.686003,306.986667 330.666667,306.986667 C278.177524,306.986667 235.527284,288.264289 234.679528,265.025571 L234.666667,264.32 L234.666667,242.986667 L234.808715,240.645666 C237.543198,218.170241 279.414642,200.32 330.666667,200.32 Z M275.991,94.069 L150.412,164.155 L192,187.259259 L317.866667,117.333333 L275.991,94.069 Z M192,47.4074074 L66.1333333,117.333333 L107.795,140.479 L233.373,70.393 L192,47.4074074 Z"
                        id="Combined-Shape"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            ) : (
              <svg
                viewBox="0 0 512 512"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>product-management</title>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    {" "}
                    <g
                      id="icon"
                      fill="#000000"
                      transform="translate(42.666667, 34.346667)"
                    >
                      {" "}
                      <path
                        d="M426.247658,366.986259 C426.477599,368.072636 426.613335,369.17172 426.653805,370.281095 L426.666667,370.986667 L426.666667,392.32 C426.666667,415.884149 383.686003,434.986667 330.666667,434.986667 C278.177524,434.986667 235.527284,416.264289 234.679528,393.025571 L234.666667,392.32 L234.666667,370.986667 L234.679528,370.281095 C234.719905,369.174279 234.855108,368.077708 235.081684,366.992917 C240.961696,371.41162 248.119437,375.487081 256.413327,378.976167 C275.772109,387.120048 301.875889,392.32 330.666667,392.32 C360.599038,392.32 387.623237,386.691188 407.213205,377.984536 C414.535528,374.73017 420.909655,371.002541 426.247658,366.986259 Z M192,7.10542736e-15 L384,106.666667 L384.001134,185.388691 C368.274441,181.351277 350.081492,178.986667 330.666667,178.986667 C301.427978,178.986667 274.9627,184.361969 255.43909,193.039129 C228.705759,204.92061 215.096345,223.091357 213.375754,241.480019 L213.327253,242.037312 L213.449,414.75 L192,426.666667 L-2.13162821e-14,320 L-2.13162821e-14,106.666667 L192,7.10542736e-15 Z M426.247658,302.986259 C426.477599,304.072636 426.613335,305.17172 426.653805,306.281095 L426.666667,306.986667 L426.666667,328.32 C426.666667,351.884149 383.686003,370.986667 330.666667,370.986667 C278.177524,370.986667 235.527284,352.264289 234.679528,329.025571 L234.666667,328.32 L234.666667,306.986667 L234.679528,306.281095 C234.719905,305.174279 234.855108,304.077708 235.081684,302.992917 C240.961696,307.41162 248.119437,311.487081 256.413327,314.976167 C275.772109,323.120048 301.875889,328.32 330.666667,328.32 C360.599038,328.32 387.623237,322.691188 407.213205,313.984536 C414.535528,310.73017 420.909655,307.002541 426.247658,302.986259 Z M127.999,199.108 L128,343.706 L170.666667,367.410315 L170.666667,222.811016 L127.999,199.108 Z M42.6666667,151.701991 L42.6666667,296.296296 L85.333,320.001 L85.333,175.405 L42.6666667,151.701991 Z M330.666667,200.32 C383.155809,200.32 425.80605,219.042377 426.653805,242.281095 L426.666667,242.986667 L426.666667,264.32 C426.666667,287.884149 383.686003,306.986667 330.666667,306.986667 C278.177524,306.986667 235.527284,288.264289 234.679528,265.025571 L234.666667,264.32 L234.666667,242.986667 L234.808715,240.645666 C237.543198,218.170241 279.414642,200.32 330.666667,200.32 Z M275.991,94.069 L150.412,164.155 L192,187.259259 L317.866667,117.333333 L275.991,94.069 Z M192,47.4074074 L66.1333333,117.333333 L107.795,140.479 L233.373,70.393 L192,47.4074074 Z"
                        id="Combined-Shape"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            )}
            <p className="text-center font-semibold">{product.name}</p>
          </div>
        </div>

        {/* Right section with product details */}
        <div className="col-span-12 md:col-span-8">
          <div
            className={`shadow-xl rounded-lg p-6 ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <table className="table-auto w-full">
              <tbody>
                {[
                  { label: "Nom", value: product.name },
                  { label: "Slug", value: product.slug },
                  { label: "Code de Produit", value: product.code },
                  { label: "Quantité", value: product.quantity },
                  {
                    label: "Prix d'achat",
                    value: `${product.buying_price} DH`,
                  },
                  {
                    label: "Prix de vente",
                    value: `${product.selling_price} DH`,
                  },
                  {
                    label: "Alerte de quantité",
                    value: (
                      <span className="text-red-600 bg-red-300 p-1 text-sm rounded-lg">
                        {product.quantity_alert}
                      </span>
                    ),
                  },
                  { label: "Tax", value: `${product.tax} %` },
                  { label: "Type de Tax", value: product.tax_type },
                  {
                    label: "Notes",
                    value: product.notes || "No notes available.",
                  },
                  {
                    label: "Nom de Catégorie",
                    value: (
                      <span className="bg-blue-300 text-sm font-mono font-bold p-1 rounded-xl">
                        {product.category_name}
                      </span>
                    ),
                  },
                  {
                    label: "Nom d'Unité",
                    value: (
                      <span className="bg-blue-300 text-sm font-mono font-bold p-1 rounded-xl">
                        {product.unit_name}
                      </span>
                    ),
                  },
                ].map(({ label, value }) => (
                  <tr key={label} className="border-b">
                    <td className="font-semibold py-2">{label}:</td>
                    <td className="py-2">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Link
              to={`/editProduct/${product.id}`}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FiEdit className="mr-2" />
              Modifier
            </Link>

            <Link
              to={`/products`}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <FiX className="mr-2" />
              Annuler
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ShowProduct;
