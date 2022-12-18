import React from "react";

function Categories() {
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Classics",
    "Action",
    "Adventure",
    "Detective",
    "Horror",
    "Comics",
  ];

  return (
    <div className="categories-container mx-3 py-3">
      <div className="container">
        <div className="title-container">
          <h2>Categories</h2>
        </div>
        <div className="categories">
          {categories.map((title, index) => {
            return (
              <div className="category" key={index}>
                {/* <img src={image} alt="Category" /> */}
                <h3>{title}</h3>
                {/* <p>{description}</p> */}
              </div>
            );
          })}
        </div>
        <button>Show All</button>
      </div>
    </div>
  );
}

export default Categories;
