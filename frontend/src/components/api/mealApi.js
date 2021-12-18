import axios from "axios";

//Base URL
export default axios.create({
  baseURL: "https://everydaypos.herokuapp.com",
});
