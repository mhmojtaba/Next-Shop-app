import http from "./httpService";

export function getProducts(querystring, strCookie) {
  return http
    .get(`/product/list?${querystring}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: strCookie,
      },
    })
    .then(({ data }) => data.data);
  // return fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/product/list?${querystring})`,
  //   { cache: "no-store" }
  // )
  //   .then((res) => res.json())
  //   .then(({ data }) => data);
}

export function getProductsBySlug(slug) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function getProductsById(id) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}

export function likeProducts(id) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

//

export function addProducts(value) {
  return http.post("/admin/product/add", value).then(({ data }) => data.data);
}

export function updateProducts({ id, value }) {
  return http
    .patch(`/admin/product/update/${id}`, value)
    .then(({ data }) => data.data);
}
