import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test-two-22w0.onrender.com/api/v1",
    // credentials:"include"   https://test-two-22w0.onrender.com/   http://localhost:4000
    //https://test-two-22w0.onrender.com/api/v1 http://localhost:3000/api/v1
  }),
  endpoints: (builder) => ({}),
  tagTypes: ["Memmer","Product", "Collection","HomePageControl"],
});

