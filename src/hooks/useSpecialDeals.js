/* eslint-disable no-undef */
const { default: useSWR } = require("swr");

const useSpecialDeals = () => {
  return useSWR("special-deals", fetchSpecialDeals, {});
};

const fetchSpecialDeals = async () => {
  const requestOption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const specialDeal = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/specials`,
    requestOption,
  );

  const dealData = await specialDeal.json();
  return dealData?.data || [];
};

export { useSpecialDeals, fetchSpecialDeals };
