"use client";

import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";

function CategorySide({ categories }) {
  return (
    <div className="col-span-1">
      <ProductFilter categories={categories} />
      <ProductSort />
    </div>
  );
}

export default CategorySide;
