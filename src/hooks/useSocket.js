import { SocketContext } from "@/provider/SocketProvider";
import { useContext } from "react";

const useSocket = () => {
  const mContext = useContext(SocketContext);
  return mContext;
};

export default useSocket;
