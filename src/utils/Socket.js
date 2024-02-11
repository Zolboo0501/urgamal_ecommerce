import io from "socket.io-client";

let socket = io("https://api.urga.mn/");
// let socket = io("http://localhost:3003/");

export default socket;
