import axios from "axios";

//Base URL
export default axios.create({
  baseURL: "http://localhost:5000",
});
