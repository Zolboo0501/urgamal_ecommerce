import { UserConfigContext } from "@/provider/userConfigProvider";
import { useContext } from "react";

const useUser = () => {
  const mContext = useContext(UserConfigContext);

  return mContext;
};

export default useUser;
