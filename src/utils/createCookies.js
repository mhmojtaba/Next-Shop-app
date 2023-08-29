export function createCookieToString(cookies) {
  let strCookie = "";
  cookies.getAll().forEach((element) => {
    strCookie += `${element?.name}=${element?.value}; `;
  });
  return strCookie;
}
