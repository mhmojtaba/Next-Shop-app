import { getProducts, getProductsBySlug } from "@/services/productService";
import AddToCart from "./AddToCart";
export const dynamic = "force-static"; // SSG
export const dynamicParams = false; //

async function Page({ params }) {
  const { slug } = params;
  const { product } = await getProductsBySlug(slug);
  //   console.log(product);
  return (
    <div className="grid grid-cols-4 space-x-2">
      <div className="col-span-1 mt-5 border border-gray-400 px-2 py-6 rounded-lg">
        Checkout
      </div>
      <div
        dir="rtl"
        className="col-span-3 mt-5 border border-gray-400 px-2 py-6 rounded-lg"
      >
        <h1 className="font-bold text-2xl mb-6">{product.title}</h1>
        <p className="mb-6">{product.description}</p>
        <p className="mb-6">
          قیمت محصول
          <span
            className={`mr-4 ${
              product.discount ? "line-through" : "font-bold"
            }`}
          >
            {product.price}
          </span>
        </p>
        {!!product.discount && (
          <div className="flex items-center gap-x-2 mb-6">
            <p className="text-xl font-bold">
              قیمت با تخفیف :{product.offPrice}
            </p>
            <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-sm text-white">
              {product.discount} %
            </div>
          </div>
        )}
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default Page;

export async function generateStaticParams() {
  const { products } = await getProducts();

  return products.map((product) => ({
    Slug: product.slug,
  }));
}
