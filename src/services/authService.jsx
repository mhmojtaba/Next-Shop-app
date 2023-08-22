import http from "./httpService";

export function getOtp(data) {
  return http.post("/user/get-otp", data);
}

export function checkOtp(data) {
  return http.post("/user/check-otp", data);
}

export function completeProfile(data) {
  return http.post("/user/complete-profile", data);
}

export function getUserProfile() {
  return http.get("/user/profile");
}

export function logout() {
  return http.post("/user/logout");
}
