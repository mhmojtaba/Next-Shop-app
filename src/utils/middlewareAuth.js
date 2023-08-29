import { createCookieToString } from "./createCookies";

export default async function middlewareAuth(request) {
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/user/profile`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: createCookieToString(request.cookies),
      },
    }
  ).then((res) => res.json());
  const { user } = data || {};
  // console.log(user);
  return user;
}
