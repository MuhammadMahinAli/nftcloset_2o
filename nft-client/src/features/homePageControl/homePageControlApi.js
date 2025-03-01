import {apiSlice} from "../api/apiSlice";


export const homePageControlApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
     addHomePageControl: builder.mutation({
      query: (data) => ({
        url: "/homePageControl/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["HomePageControl"],
    }),

    getAllHomePageControl : builder.query({
      query: () => ({
        url: `/homePageControl/getAll`,
        method: "GET",
      }),
      providesTags: ["HomePageControl"],
    }),

    // getAllStatusFriendRequest: builder.query({
    //   query: (id) => ({
    //     url: `/homePageControl/getAll/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["Friend"],
    // }),
 

    updateHomePageControlInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/homePageControl/updateHomePageControlInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["HomePageControl"],

    }),
    deleteHomePageControl: builder.mutation({
      query: (id) => ({
        url: `/homePageControl/deleteHomePageControl/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["HomePageControl"],
    }),
   
  }),
});

 export const {useAddHomePageControlMutation, useGetAllHomePageControlQuery,useUpdateHomePageControlInfoMutation, useDeleteHomePageControlMutation } = homePageControlApi;

// useGetAllPostQuery   useDeleteFriendRequestMutation ,useGetAllSentPendingFriendRequestQuery,useGetAllStatusFriendRequestQuery, useGetFriendRequestQuery,useGetAcceptedFriendRequestQuery, useGetOthersAcceptedFriendRequestQuery,useUpdateFriendRequestStatusMutation