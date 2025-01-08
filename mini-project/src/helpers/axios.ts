import axios from "axios";

// const BASEURL = process.env.NEXT_PUBLIC_BASE_URL_BE;
const BASEURL = process.env.NEXT_PUBLIC_BASE_URL_BE;

export default axios.create({
  baseURL: BASEURL,
});
