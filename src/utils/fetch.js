/* eslint-disable no-undef */
import axios from "axios";
export const fetchMethod = async (method, path, token, body) => {
  const headerWithToken = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const headerWithOutToken = {
    "Content-Type": "application/json",
  };

  const requestOption = {
    method,
    headers: token ? headerWithToken : headerWithOutToken,
    ...(body && { body: JSON.stringify(body) }),
  };

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
    requestOption,
  )
    .then(async (res) => {
      if (res.status === 200) {
        return await res.json();
      } else {
        return await res.json();
      }
    })
    .catch((err) => err);

  return data;
};

export const fetcher = async (url) =>
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => res.data.result)
    .catch((error) => console.log(error, "err in fetcher"));
