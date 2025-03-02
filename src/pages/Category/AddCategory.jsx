import React, { useContext, useState } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    icon: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  // State to store the uploaded icon file (if any)
  const [iconFile, setIconFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  // Handle icon file upload
  const handleIconFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file); // Store the selected file
      setCategoryData({ ...categoryData, icon: file.name }); // Set the file name in category data
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.1.7:3000/api/categorys",
        categoryData
      );
      console.log("Category added successfully:", response.data);
      setIsModalOpen(false); // Close modal on success
      document.body.style.overflow = "auto"; // Re-enable scrolling
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

//   return (
//     <div className="p-6">

//     <button
//       onClick={openModal}
//       className={`flex items-center py-2 px-6 rounded-lg shadow-md transition-all ${
//         theme === "dark"
//           ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
//           : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
//       }`}        >
//       <FiPlus className="mr-2" size={20} />
//       Add Category
//     </button>

//     {/* {isModalOpen && (
//       <div
//         className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden"
//         style={{ zIndex: 1050 }}
//       >
//         <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//           <h2 className="text-2xl font-bold mb-4">Add Category</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium">
//                 Category Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={categoryData.name}
//                 onChange={handleChange}
//                 className="border px-3 py-2 w-full rounded"
//               />
//             </div>
//             <div>
//               <label htmlFor="slug" className="block text-sm font-medium">
//                 Slug
//               </label>
//               <input
//                 type="text"
//                 id="slug"
//                 name="slug"
//                 value={categoryData.slug}
//                 onChange={handleChange}
//                 className="border px-3 py-2 w-full rounded"
//               />
//             </div>

//             <div>
//               <label htmlFor="icon" className="block text-sm font-medium">
//                 Icon (URL or File)
//               </label>
//               <div className="space-y-2">
//                 <input
//                   type="text"
//                   id="icon"
//                   name="icon"
//                   value={categoryData.icon}
//                   onChange={handleChange}
//                   placeholder="Enter icon URL"
//                   className="border px-3 py-2 w-full rounded"
//                 />
//                 <input
//                   type="file"
//                   onChange={handleIconFileChange}
//                   className="border px-3 py-2 w-full rounded"
//                 />
//               </div>
//             </div>

//             <div className="flex justify-end space-x-2">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="bg-gray-500 text-white py-2 px-4 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white py-2 px-4 rounded"
//               >
//                 Add Category
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )} */}
//   </div>
// );
};

export default AddCategory;
