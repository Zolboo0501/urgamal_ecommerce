/* eslint-disable no-undef */
import axios from "axios";

export const fetchMethod = async (method, path, token, body) => {
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const requestOptions = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${path}`,
      requestOptions,
    );

    // Check for a successful response and return the JSON body
    if (!response.ok) {
      // You can handle non-200 status codes differently if needed
      const errorData = await response.json();
      console.log(errorData.message || "An error occurred");
    }
    // if (response.status === 401) {
    //   window.location.href = "/login?expired";
    // }
    // If status is 200, return the response as JSON
    return await response.json();
  } catch (err) {
    // Handle any errors that occur during the fetch
    console.log("Fetch error:", err);
    return { error: err.message || "An error occurred" };
  }
};

export const fetcher = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data.result;
  } catch (error) {
    console.log("Error in fetcher:", error);
  }
};
