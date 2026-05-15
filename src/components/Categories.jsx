import React from 'react';

function Categories({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <section className="category-section">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${
            selectedCategory === category ? 'active-category' : ''
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </section>
  );
}

export default Categories;
