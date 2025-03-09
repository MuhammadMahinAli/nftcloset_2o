import {apiSlice} from "../api/apiSlice";


export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
     addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Product"],
    }),

    getAllProduct: builder.query({
      query: () => ({
        url: `/product/getAll`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    // getFriendRequest: builder.query({
    //   query: (id) => ({
    //     url: `/product/Pending/getFriendRequest/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Friend"],
    // }),
    // getAllStatusFriendRequest: builder.query({
    //   query: (id) => ({
    //     url: `/product/getAll/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Friend"],
    // }),
 

    updateProductInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/product/updateProductInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    createNewRequest: builder.mutation({
      query: (data) => ({
        url: "/deliveryCharge/new-request",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Product"],
    }),
  }),
});

 export const {useCreateNewRequestMutation,useDeleteProductMutation ,useAddProductMutation, useGetAllProductQuery, useUpdateProductInfoMutation } = productApi;

// useGetAllPostQuery   useDeleteFriendRequestMutation ,useGetAllSentPendingFriendRequestQuery,useGetAllStatusFriendRequestQuery, useGetFriendRequestQuery,useGetAcceptedFriendRequestQuery, useGetOthersAcceptedFriendRequestQuery,useUpdateFriendRequestStatusMutation