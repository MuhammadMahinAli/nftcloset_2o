/* eslint-disable no-unused-vars */
import axios from "axios";
import dotenv from "dotenv";

//connect pinata
var config = {
  method: "get",
  url: "https://api.pinata.cloud/data/testAuthentication",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_JWT}`,
  },
};
export async function connect() {
  try {
    const res = await axios(config);
    console.log(res.data);
  } catch (error) {
    //
  }
}
