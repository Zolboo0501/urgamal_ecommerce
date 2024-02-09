/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { UserConfigContext } from "./userConfigContext";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { tokenDecode } from "./utils";
import socket from "@/utils/Socket";

const userToken = getCookie("token");
const userConfigs = getCookie("preference_config");

export const UserConfigProvider = ({ children }) => {
  const router = useRouter();
  //state
  const [auth, setAuth] = useState(false);
  const [configId, setConfigId] = useState(null);
  const [address, setAddress] = useState(null);
  const [links, setLinks] = useState(null);
  // auth
  const login = (token) => {
    const bigDate = 30 * 24 * 60 * 60 * 1000;
    setCookie("token", token, {
      maxAge: bigDate,
    });
    const decoded = tokenDecode(token);
    console.log(socket.id, "socket id")
    console.log(decoded.userid, "decoded id")
    socket.emit("storeMySocketId", decoded.userid)
    setAuth(true);
  };
  const logout = () => setAuth(false);

  const preference_cookie = (val) => {
    setCookie("preference_config", val);
    setConfigId(val);
  };

  const getAddress = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/config/layout`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setAddress(response?.data?.data);
      });
  };

  const getLinks = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/config/links`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        setLinks(response?.data?.data);
      });
  };
  //useEffect
  useEffect(() => {
    getAddress();
    getLinks();
    if (!userConfigs) {
      if (router.pathname === "/home") {
        setConfigId(null);
        return;
      }
      setConfigId(1);
      setCookie("preference_config", 1);
    } else {
      setConfigId(userConfigs);
    }
    if (userToken) {
      if (jwtDecode(userToken).exp < Date.now() / 1000) {
        setAuth(false);
        deleteCookie("token");
        deleteCookie("preference_config");
        deleteCookie("number");
      } else {
        setAuth(true);
      }
    }
  }, []);

  return (
    <UserConfigContext.Provider
      value={{
        preferenceConfig: userConfigs ? userConfigs : null,
        auth,
        login,
        logout,
        configId,
        preference_cookie,
        address,
        links,
      }}
    >
      {children}
    </UserConfigContext.Provider>
  );
};
