import http from "./httpService";

export function getProducts(querystring) {
  return http.get(`/product/list?${querystring}`).then(({ data }) => data.data);
}
