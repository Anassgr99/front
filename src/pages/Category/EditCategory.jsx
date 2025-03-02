import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditCategory = () => {
  const [category, setCategory] = useState(null);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [icon, setIcon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/categorys/${id}`);
        setCategory(response.data);
        setName(response.data.name);
        setSlug(response.data.slug);
        setIcon(response.data.icon);
      } catch (error) {
        alert(`Failed to fetch category: ${error.response?.data?.message || error.message}`);
      }
    };
    fetchCategory();
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !slug) return alert('Name and slug are required.');

    setIsSubmitting(true);
    try {
      const categoryData = { name, slug, icon };
      await axios.put(`http://localhost:3000/api/categorys/${id}`, categoryData);
      alert('Category updated successfully!');
      navigate('/ShowCategories'); // Redirect to categories page
    } catch (error) {
      alert(`Failed to update category: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Modifier la catégorie</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nom de Catégorie:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white text-gray-700"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Catégorie Slug:</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white text-gray-700"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Icone de Catégorie:</label>
            <input
              type="text"
              placeholder="Enter icon link or upload a file"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg bg-white text-gray-700"
              disabled={isSubmitting}
            />
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Handle file upload logic here
                  const fileUrl = URL.createObjectURL(file); // Temporary URL
                  setIcon(fileUrl); // Replace this with file upload logic if needed
                }
              }}
              className="w-full mt-2"
              disabled={isSubmitting}
            />
          </div>
          <button
            onClick={handleUpdate}
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Mise a jour Catégorie'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
