import { jwtDecode } from "jwt-decode";

export const tokenDecode = (token) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export function numberWithCommas(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}
