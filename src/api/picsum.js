import axios from "axios";

export default axios.create({
  baseURL: "https://picsum.photos/v2",
  headers: {
    "Content-Type": "application/json",
  },
});
