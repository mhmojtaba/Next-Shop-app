import http from "./httpService";

export function getCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function addCategory(value) {
  return http.post("/admin/category/add", value).then(({ data }) => data.data);
}

export function getCategoryById(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function updateCategory({ id, value }) {
  return http
    .patch(`/admin/category/update/${id}`, value)
    .then(({ data }) => data.data);
}

export function removeCategory(id) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
