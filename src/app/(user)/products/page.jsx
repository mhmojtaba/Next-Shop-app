import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import CategorySide from "./CategorySide";
import queryString from "query-string";
import Link from "next/link";
import AddToCart from "./[slug]/AddToCart";
import LikeProduct from "./LikeProduct";
import { cookies } from "next/headers";
import { createCookieToString } from "@/utils/createCookies";
import { toLocalDateString } from "@/utils/tolocalDate";

export const dynamic = "force-dynamic";

async function Products({ searchParams }) {
  const cookieStore = cookies();
  const strCookie = createCookieToString(cookieStore);
  // const token = cookieStore.getAll();
  // console.log(token);
  const params = queryString.stringify(searchParams);
  // const { products } = await getProducts(params);
  // const { categories } = await getCategories();

  // getting data via parallel data fetching
  const productPromise = getProducts(params, strCookie);
  const categoryPromise = getCategories();
  const [{ products }, { categories }] = await Promise.all([
    productPromise,
    categoryPromise,
  ]);
  // console.log(products);
  // console.log(queryString.stringify(searchParams));
  return (
    <div>
      <h1 className="text-center my-5">Products Page</h1>
      <div className=" grid grid-cols-4 mr-1" dir="rtl">
        <CategorySide categories={categories} />
        <div className="col-span-3">
          <div className=" grid grid-cols-3 gap-4">
            {products.map((prod) => {
              return (
                <div
                  key={prod._id}
                  className="col-span-1 border rounded-xl shadow-md p-4"
                >
                  <h2 className="font-bold">{prod.title}</h2>
                  <div className="mb-4">
                    <span>تاریخ ساختن : </span>
                    <span className="font-bold">
                      {toLocalDateString(prod.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/products/${prod.slug}`}
                      className="text-sky-500 font-bold"
                    >
                      مشاهده محصول
                    </Link>
                    <LikeProduct product={prod} />
                  </div>
                  <AddToCart product={prod} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
