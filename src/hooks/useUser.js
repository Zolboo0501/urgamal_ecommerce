import { UserConfigContext } from "../provider/UserConfigProvider";
import { useContext } from "react";

const useUser = () => {
  const mContext = useContext(UserConfigContext);

  return mContext;
};

export default useUser;
