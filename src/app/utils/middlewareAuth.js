export default async function middlewareAuth(request) {
  let strCookie = "";
  request.cookies.getAll().forEach((element) => {
    strCookie += `${element?.name}=${element?.value}; `;
  });
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        cookie: strCookie,
      },
    }
  ).then((res) => res.json());
  const { user } = data || {};
  return user;
}
