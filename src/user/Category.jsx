import React, { useState, useEffect } from 'react';
import CategoryDetails from './CategoryDetails';
import { motion } from 'framer-motion';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState([]);
  const [filteredDetails, setFilteredDetails] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamically load all icons from the `../assets/brands` folder
  const icons = import.meta.glob('../assets/brands/*.png', { eager: true });
  console.log("user", localStorage.getItem("customerId"));

  useEffect(() => {
    // Fetch categories from backend
    fetch('http://192.168.1.7:3000/api/category')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    // Filter category details based on the search query
    if (searchQuery.trim() === '') {
      setFilteredDetails(categoryDetails);
    } else {
      const filtered = categoryDetails.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDetails(filtered);
    }
  }, [searchQuery, categoryDetails]);

  const getCategoryDetails = (categoryId) => {
    fetch(`http://192.168.1.7:3000/api/productsC/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryDetails(data);
        setFilteredDetails(data); // Initialize filtered details
      })
      .catch((error) =>
        console.error('Error fetching category details:', error)
      );
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    getCategoryDetails(categoryId);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{ backgroundColor: '#0e1227' }}
        className="p-4 border-b-2 border-black flex items-center justify-between"
      >
        <div className="flex flex-row gap-4 overflow-x-auto scrollbar-hide ">
          {categories.map((category) => {
            // Dynamically import the category icon based on the category icon name
            const categoryIcon = icons[`../assets/brands/${category.icon}.png`]?.default;

            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: category.bg || '#1E88E5',
                }}
                className="flex items-center justify-center flex-col min-w-[120px]"
              >
                <img
                  src={categoryIcon} // Use dynamically imported icon
                  alt={category.name}
                  className="w-30 h-10 mb-2"
                />
                <h3 className="text-[#dfe3f4] font-bold text-center">
                  {category.name}
                </h3>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="p-4" style={{ backgroundColor: '#0e1227' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 rounded-md border border-gray-400 bg-[#1e1e2e] text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div
        className="p-4 border-b border-black max-h-[430px]   "
        style={{ backgroundColor: '#0e1227' }}
      >
        {filteredDetails.length > 0 ? (
          <CategoryDetails categoryDetails={filteredDetails} />
        ) : (
          <small className="text-[#818497] ">
            No products found for this category.
          </small>
        )}
      </div>
    </>
  );
};

export default Category;