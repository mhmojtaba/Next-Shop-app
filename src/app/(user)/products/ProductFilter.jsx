"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import CheckBox from "@/common/CheckBox";
import React from "react";

function ProductFilter({ categories }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || []
  );

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const selectedCategoryHandler = (e) => {
    const { value } = e.target;
    if (selectedCategories.includes(value)) {
      const filetred = selectedCategories.filter((item) => item !== value);
      setSelectedCategories(filetred);
      router.push(pathname + "?" + createQueryString("category", filetred));
    } else {
      setSelectedCategories([...selectedCategories, value]);
      router.push(
        pathname +
          "?" +
          createQueryString("category", [...selectedCategories, value])
      );
    }
    // console.log(selectedCategories);
  };

  return (
    <div>
      <p className="font-bold mb-4">Categories</p>
      <ul className=" space-y-4">
        {categories.map((cat) => {
          return (
            <CheckBox
              key={cat._id}
              label={cat.title}
              id={cat._id}
              name="product-category"
              value={cat.englishTitle}
              checked={selectedCategories.includes(cat.englishTitle)}
              onChange={selectedCategoryHandler}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductFilter;
