import React from 'react';

function Categories({ categories, selectedCategory, handleSelectedCategory }) {
  return (
    <section className="category-section">
      <h3>Popular Category</h3>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? 'active-category' : ''
            }`}
            onClick={() => handleSelectedCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
