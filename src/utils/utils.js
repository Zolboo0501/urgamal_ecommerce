import { jwtDecode } from "jwt-decode";

export const tokenDecode = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};
