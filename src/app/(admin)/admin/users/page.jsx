"use client";

import { useGetAllUsers } from "@/hooks/useAuth";
import { HashLoader } from "react-spinners";

function Users() {
  const { data, error, isLoading } = useGetAllUsers();

  const { users } = data || {};
  //   console.log(users);
  if (isLoading) return <HashLoader />;
  return (
    <div>
      <table className="border-collapse w-full text-sm table-auto min-w-[800px] ">
        <thead>
          <tr>
            {Thead.map((head) => {
              return (
                <th
                  className="whitespace-nowrap border-gray-700 gap-x-2 mb-2 table_th"
                  key={head.id}
                >
                  {head.lable}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={user._id}>
                <td className="table_td">{index}</td>
                <td className="table_td">{user.name}</td>
                <td className="table_td max-w-[200px] truncate">
                  {user.email}
                </td>
                <td className="table_td max-w-[200px] truncate">
                  {user.phoneNumber}
                </td>
                <td className=" table_td">
                  <div className="flex flex-col items-start">
                    {user.Products.map((product) => (
                      <span
                        className="text-gray-100 bg-slate-600 rounded-xl mb-2 px-2 py-1 truncate"
                        key={product._id}
                      >
                        {product.title}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="table_td">
                  {user.biography ? (
                    user.biography
                  ) : (
                    <span className="text-rose-400 border rounded-xl mb-2 px-2 py-1">
                      notSet
                    </span>
                  )}
                </td>
                <td className="table_td">{user.createdAt.slice(0, 10)}</td>
                <td className="table_td">
                  <div>
                    {user.isActive ? (
                      <span className="bg-green-400 rounded-xl mb-2 px-2 py-1">
                        Active
                      </span>
                    ) : (
                      <span className="bg-rose-400 rounded-xl mb-2 px-2 py-1">
                        notActive
                      </span>
                    )}
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

export default Users;

export const Thead = [
  {
    id: 1,
    lable: "#",
  },
  {
    id: 2,
    lable: "name ",
  },
  {
    id: 3,
    lable: "email",
  },
  {
    id: 4,
    lable: "phoneNumber",
  },
  {
    id: 5,
    lable: "products",
  },
  {
    id: 6,
    lable: "biography",
  },
  {
    id: 7,
    lable: "createdAt",
  },
  {
    id: 8,
    lable: "Status",
  },
];
