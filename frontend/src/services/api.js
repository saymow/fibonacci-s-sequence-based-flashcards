import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:3333",
  // I had some troubles with axios.current.headers, therefore, this was my provisory "solution" to set 
  // the header, the CON with this "solution" is that THE PAGE NEEDS TO RELOAD AFTER EITHER LOGIN OR LOGOUT METHODS
  headers: {
    Authorization: "Bearer " + localStorage.getItem("@Auth:token"),
  },
});

export default Api;
