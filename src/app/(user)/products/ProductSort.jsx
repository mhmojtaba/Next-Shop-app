"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import Radio from "@/common/Radio";
import React from "react";
const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدیدترین",
  },
  {
    id: 2,
    value: "earlies",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState("");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  //   console.log(searchParams);
  useEffect(() => {
    setSort(searchParams.get("sort"));
  }, [searchParams]);

  // sort handler function
  const sortHandler = (e) => {
    const { value } = e.target;
    setSort(value);
    router.push(pathname + "?" + createQueryString("sort", value));
  };

  return (
    <div className="mt-5">
      <p className="font-bold mb-4">Sort By:</p>
      <ul className=" space-y-4">
        {sortOptions.map((sr) => {
          return (
            <Radio
              key={sr.id}
              label={sr.label}
              id={sr.id}
              name="product-sort"
              value={sr.value}
              checked={sort === sr.value}
              onChange={sortHandler}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ProductSort;
