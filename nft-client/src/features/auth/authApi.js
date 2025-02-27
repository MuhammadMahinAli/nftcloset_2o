import {apiSlice} from "../api/apiSlice";
 import { userLoggedIn} from "./authSlice";
 import { userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log("auth",result.data);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.data.accessToken,
              user: result.data.data.user,
            })
          );
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-password",
        method: "PUT",
        body: data, // data should contain userId and newPassword
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log("Password update successful", result.data);
    
          // Optionally, if you want to log out the user after a password update:
          localStorage.removeItem("auth");
          dispatch(userLoggedOut());
    
          // Show a success message or navigate the user as needed
        } catch (err) {
          console.log("Password update error:", err);
        }
      },
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/member/sign-up",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["Member"],
    }),
    updateCoverPic: builder.mutation({
      query: ({id, data}) => ({
        url: `/member/updateCoverPic/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["SingleMember"],
    }),
    updateProfilePic: builder.mutation({
      query: ({id, data}) => ({
        url: `/member/updateProfilePic/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["SingleMember"],
    }),
    updateAddress: builder.mutation({
      query: ({ id, addressId, data }) => ({
        url: `/member/${id}/address/${addressId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidateTags: ["SingleMember"]
    }),
    // Add to your existing authApi endpoints
addAddress: builder.mutation({
  query: ({ id, data }) => ({
    url: `/member/${id}/address`,
    method: 'POST',
    body: data,
  }),
  invalidatesTags: ['SingleMember']
}),

deleteAddress: builder.mutation({
  query: ({ id, addressId }) => ({
    url: `/member/${id}/address/${addressId}`,
    method: 'DELETE',
  }),
  invalidatesTags: ['SingleMember']
}),
    updateUserInfo: builder.mutation({
      query: ({id, data}) => ({
        url: `/member/updateUserInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["Member"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/member/getAll",
        method: "GET",
      }),
      providesTags: ["Member"],
    }),
    getFilteredUsers: builder.query({
      query: (data) => ({
        url: "/user/filteredUsers",
        method: "POST",
        body: data,
      }),
    }),
    
    deleteUser: builder.mutation({
      query: (email) => ({
        url: `/user/deleteUser/${email}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Member"],
    }),
    
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/member/getUserById/${id}`,
        method: "GET",
      }),
      providesTags: ["SingleMember"],
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/member/verify-email?token=${token}`,
        method: "GET",
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ id, newPassword, token }) => ({
        url: `/member/reset-password?id=${id}`,
        method: 'PUT', // Using PUT for password updates
        body: { newPassword, token },
      }),
  }),
  }),
});

 export const {useAddAddressMutation,useDeleteAddressMutation,useUpdateAddressMutation,useResetPasswordMutation, useUpdatePasswordMutation,useLoginMutation,useSignUpMutation,useUpdateCoverPicMutation, useUpdateUserInfoMutation,useUpdateProfilePicMutation,useGetAllUsersQuery,useGetFilteredUsersQuery,useGetSingleUserQuery,useDeleteUserMutation,  useVerifyEmailQuery} = authApi;

