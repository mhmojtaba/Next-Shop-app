import http from "./httpService";

export function getProducts(querystring) {
  return http.get(`/product/list?${querystring}`).then(({ data }) => data.data);
  // return fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/list?${querystring})`,
  //   { cache: "no-store" }
  // )
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}
