import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import React from "react";
import CategorySide from "./CategorySide";
import queryString from "query-string";

async function Products({ searchParams }) {
  const params = queryString.stringify(searchParams);
  const { products } = await getProducts(params);
  const { categories } = await getCategories();
  // console.log(queryString.stringify(searchParams));
  return (
    <div>
      <h1 className="text-center my-5">Products Page</h1>
      <div className=" grid grid-cols-4 mr-1" dir="rtl">
        <CategorySide categories={categories} />
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {products.map((prod) => {
            return (
              <div
                key={prod._id}
                className="col-span-1 border rounded-xl shadow-md p-4"
              >
                <h2 className="font-bold">{prod.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Products;
