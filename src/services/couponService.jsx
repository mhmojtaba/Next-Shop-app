import http from "./httpService";

export function getCoupon() {
  return http.get("/admin/coupon/list").then(({ data }) => data.data);
}

export function getOneCoupon(id) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function addCoupon(data) {
  return http.post("/admin/coupon/add", data).then(({ data }) => data.data);
}

export function updateCoupon({ id, value }) {
  return http
    .patch(`/admin/coupon/update/${id}`, value)
    .then(({ data }) => data.data);
}

export function removeCoupon(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
