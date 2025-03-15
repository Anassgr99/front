// import React, { useContext, useState } from "react";
// import axios from "axios";
// import { FiPlus } from "react-icons/fi";
// import { ThemeContext } from "../../context/ThemeContext";

// const AddCategory = () => {
//   const [categoryData, setCategoryData] = useState({
//     name: "",
//     slug: "",
//     icon: "", // Will hold the slug (e.g., "electronics")
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { theme } = useContext(ThemeContext);
//   const [iconFile, setIconFile] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCategoryData({ ...categoryData, [name]: value });
//   };

//   // When a file is selected, store it
//   const handleIconFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setIconFile(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!categoryData.name.trim() || !categoryData.slug.trim()) {
//       alert("Veuillez remplir tous les champs obligatoires.");
//       return;
//     }

//     try {
//       let iconValue = categoryData.icon; // Initially may be empty

//       // If an icon file is selected, upload it first
//       if (iconFile) {
//         const formData = new FormData();
//         formData.append("slug", categoryData.slug); // Append slug first
//         formData.append("icon", iconFile); // Then append the file
      
//         // Notice: No manual Content-Type header here
//         const uploadResponse = await axios.post("http://5.189.179.133:3000/api/upload", formData);
//         iconValue = uploadResponse.data.iconName;
//       }

//       // Prepare the payload for creating the category;
//       // The icon field will now be set to the slug value.
//       const categoryPayload = { ...categoryData, icon: iconValue };

//       // Post the category data to your API
//       const response = await axios.post("http://5.189.179.133:3000/api/categorys", categoryPayload);
//       console.log("Category added successfully:", response.data);

//       // Reset form fields and close modal
//       setIsModalOpen(false);
//       document.body.style.overflow = "auto";
//       setCategoryData({ name: "", slug: "", icon: "" });
//       setIconFile(null);
//     } catch (error) {
//       console.error("Error adding category:", error);
//     }
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden"; // Disable background scrolling
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.style.overflow = "auto"; // Re-enable scrolling
//   };

//   return (
//     <div className="p-6">
//       <button
//         onClick={openModal}
//         className={`flex items-center py-2 px-6 rounded-lg shadow-md transition-all ${
//           theme === "dark"
//             ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
//             : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
//         }`}
//       >
//         <FiPlus className="mr-2" size={20} />
//         Ajouter une catégorie
//       </button>

//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50 overflow-hidden"
//           style={{ zIndex: 1050 }}
//         >
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
//             <h2 className="text-2xl font-bold mb-4">Ajouter une catégorie</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium">
//                   Nom de la catégorie
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={categoryData.name}
//                   onChange={handleChange}
//                   className="border px-3 py-2 w-full rounded"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="slug" className="block text-sm font-medium">
//                   Matricule
//                 </label>
//                 <input
//                   type="text"
//                   id="slug"
//                   name="slug"
//                   value={categoryData.slug}
//                   onChange={handleChange}
//                   className="border px-3 py-2 w-full rounded"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="icon" className="block text-sm font-medium">
//                   Icon (File)
//                 </label>
//                 <div className="space-y-2">
//                   {/* This field might be used if the user wants to manually set an icon URL */}
//                   {/* <input
//                     type="text"
//                     id="icon"
//                     name="icon"
//                     value={categoryData.icon}
//                     onChange={handleChange}
//                     placeholder="Enter icon URL"
//                     className="border px-3 py-2 w-full rounded"
//                   /> */}
//                   {/* File input for uploading an image */}
//                   <input
//                     type="file"
//                     onChange={handleIconFileChange}
//                     className="border px-3 py-2 w-full rounded"
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="bg-gray-500 text-white py-2 px-4 rounded"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white py-2 px-4 rounded"
//                 >
//                   Ajouter une catégorie
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddCategory;



import React, { useContext, useState } from "react";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

const AddCategory = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    slug: "",
    icon: "", // Will hold the slug (e.g., "electronics")
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [iconFile, setIconFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  // When a file is selected, store it
  const handleIconFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!categoryData.name.trim() || !categoryData.slug.trim()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      let iconValue = categoryData.icon; // Initially may be empty

      // If an icon file is selected, upload it first
      if (iconFile) {
        const formData = new FormData();
        formData.append("slug", categoryData.slug); // Append slug first
        formData.append("icon", iconFile); // Then append the file
      
        // Notice: No manual Content-Type header here
        const uploadResponse = await axios.post("http://5.189.179.133:3000/api/upload", formData);
        iconValue = uploadResponse.data.iconName;
      }

      // Prepare the payload for creating the category;
      // The icon field will now be set to the slug value.
      const categoryPayload = { ...categoryData, icon: iconValue };

      // Post the category data to your API
      const response = await axios.post("http://5.189.179.133:3000/api/categorys", categoryPayload);
     //console.log("Category added successfully:", response.data);

      // Reset form fields and close modal
      setIsModalOpen(false);
      document.body.style.overflow = "auto";
      setCategoryData({ name: "", slug: "", icon: "" });
      setIconFile(null);
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

  return (
    <div className={`p-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <button
        onClick={openModal}
        className={`flex items-center py-2 px-6 rounded-lg shadow-md transition-all ${
          theme === "dark"
            ? "bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg"
            : "bg-white text-gray-800 hover:bg-blue-50 hover:shadow-lg"
        }`}
      >
        <FiPlus className="mr-2" size={20} />
        Ajouter une catégorie
      </button>

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex justify-center items-center z-50 overflow-hidden ${
            theme === "dark" ? "bg-gray-800 bg-opacity-75" : "bg-gray-200 bg-opacity-75"
          }`}
          style={{ zIndex: 1050 }}
        >
          <div
            className={`rounded-lg shadow-lg p-6 w-full max-w-lg relative ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">Ajouter une catégorie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={categoryData.name}
                  onChange={handleChange}
                  className={`border px-3 py-2 w-full rounded ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="slug"
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Matricule
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  value={categoryData.slug}
                  onChange={handleChange}
                  className={`border px-3 py-2 w-full rounded ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white"
                      : ""
                  }`}
                />
              </div>
              <div>
                <label
                  htmlFor="icon"
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Icon (File)
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    onChange={handleIconFileChange}
                    className={`border px-3 py-2 w-full rounded ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white"
                        : ""
                    }`}
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Ajouter une catégorie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
