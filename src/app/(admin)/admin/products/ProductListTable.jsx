import Link from "next/link";
import { RiEdit2Line } from "react-icons/ri";
import { HiEye, HiTrash } from "react-icons/hi";
import { useRemoveProduct } from "@/hooks/useProducts";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { productListTableTHeads } from "@/const/tableHeads";

function ProductListTable({ products }) {
  const { mutateAsync } = useRemoveProduct();
  const queryClient = useQueryClient();

  const removeProductHandler = async (id) => {
    try {
      const { message } = await mutateAsync(id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-products"] });
    } catch (error) {
      toast.error(error?.respone?.data?.message);
    }
  };

  // console.log(products);

  return (
    <div className="shadow-sm overflow-auto my-8" dir="rtl">
      <table className="border-collapse table-auto w-full min-w-[800px] text-sm">
        <thead>
          <tr>
            {productListTableTHeads.map((item) => {
              return (
                <th
                  className="whitespace-nowrap table__th text-center"
                  key={item.id}
                >
                  {item.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product, index) => {
              return (
                <tr key={product._id}>
                  <td className="table__td">{index + 1}</td>
                  <td className="table__td  whitespace-nowrap font-bold">
                    {product.title}
                  </td>
                  <td className="table__td">{product.category.title}</td>
                  <td className="table__td">{product.price}</td>
                  <td className="table__td">{product.discount}</td>
                  <td className="table__td">{product.offPrice}</td>
                  <td className="table__td">{product.countInStock}</td>
                  <td className="table__td font-bold text-lg">
                    <div className="flex items-center justify-center gap-x-4">
                      <Link href={`/admin/products/${product._id}`}>
                        <HiEye className="text-sky-600 w-6 h-6" />
                      </Link>
                      <button onClick={() => removeProductHandler(product._id)}>
                        <HiTrash className="text-rose-600 w-6 h-6" />
                      </button>
                      <Link href={`/admin/products/edit/${product._id}`}>
                        <RiEdit2Line className="w-6 h-6 text-secondary-600" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default ProductListTable;
