import {apiSlice} from "../api/apiSlice";


export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
     addOrder: builder.mutation({
      query: (data) => ({
        url: "/order/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Order"],
    }),

    getAllOrder: builder.query({
      query: () => ({
        url: `/order/getAll`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `/order/getOrderById/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getAllOrderByMember: builder.query({
      query: (id) => ({
        url: `/order/getAllOrderByMember/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    getPendingOrder: builder.query({
      query: (id) => ({
        url: `/order/getPendingOrder/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    // getAllStatusFriendRequest: builder.query({
    //   query: (id) => ({
    //     url: `/order/getAll/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Friend"],
    // }),
 

    updateOrderStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/order/updateStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Order"],
    }),
    updateOrderDigitalAssetStatus: builder.mutation({
      query: ({id, data}) => ({
        url: `/order/updatedigitalAssetStatus/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Order"],
    }),

    // deleteFriendRequest: builder.mutation({
    //   query: (id) => ({
    //     url: `/order/deleteFriendRequest/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Order"],
    // }),
   
  }),
});

 export const {useUpdateOrderDigitalAssetStatusMutation,useUpdateOrderStatusMutation,useAddOrderMutation, useGetAllOrderQuery,useGetAllOrderByMemberQuery,useGetPendingOrderQuery,useGetOrderByIdQuery } = orderApi;
