import {apiSlice} from "../api/apiSlice";


export const collectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
     addCollection: builder.mutation({
      query: (data) => ({
        url: "/collection/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Collection"],
    }),

    getAllCollection : builder.query({
      query: () => ({
        url: `/collection/getAll`,
        method: "GET",
      }),
      providesTags: ["Collection"],
    }),

    // getAllStatusFriendRequest: builder.query({
    //   query: (id) => ({
    //     url: `/collection/getAll/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Friend"],
    // }),
 

    updateCollectionInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/collection/updateCollectionInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Collection"],

    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/collection/deleteCollection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),
   
  }),
});

 export const {useAddCollectionMutation, useGetAllCollectionQuery,useUpdateCollectionInfoMutation, useDeleteCollectionMutation } = collectionApi;

// useGetAllPostQuery   useDeleteFriendRequestMutation ,useGetAllSentPendingFriendRequestQuery,useGetAllStatusFriendRequestQuery, useGetFriendRequestQuery,useGetAcceptedFriendRequestQuery, useGetOthersAcceptedFriendRequestQuery,useUpdateFriendRequestStatusMutation