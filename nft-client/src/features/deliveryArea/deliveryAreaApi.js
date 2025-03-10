import {apiSlice} from "../api/apiSlice";


export const deliveryAreaApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   
     addDeliveryArea: builder.mutation({
      query: (data) => ({
        url: "/deliveryArea/add-new",
        method: "POST",
        body: data,
      }),
     invalidateTags: ["DeliveryArea"],
    }),

    getAllDeliveryArea: builder.query({
      // We accept an object with optional filtering & pagination parameters
      // For example: { country: 'US', city: 'Florida', page: 2, limit: 5 }
      query: (filters = {}) => {
        // Deconstruct with defaults
        const {
          country,
          city,
          page = 1,
          limit = 10,
        } = filters;
    
        // Build query string only from defined filters
        const queryParams = new URLSearchParams({
          ...(country ? { country } : {}),
          ...(city ? { city } : {}),
          page,
          limit
        });
    
        return {
          url: `/deliveryArea/getAll?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["DeliveryArea"],
    }),
    



    updateDeliveryArea: builder.mutation({
      query: ({id, data}) => ({
        url: `/deliveryArea/updateInfo/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidateTags: ["DeliveryArea"],
    }),
  

    deleteDeliveryArea: builder.mutation({
      query: (id) => ({
        url: `/deliveryArea/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryArea"],
    }),
   
  }),
});

 export const {useUpdateDeliveryAreaMutation,useAddDeliveryAreaMutation, useGetAllDeliveryAreaQuery,useDeleteDeliveryAreaMutation } = deliveryAreaApi;
