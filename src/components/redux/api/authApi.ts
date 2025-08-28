import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (adminInfo) => ({
        url: "/login",
        method: "POST",
        body: adminInfo,
      }),
    }),
    registration: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: data,
        };
      },
    }),

    getAllAdmin: builder.query({
      query: () => {
        return {
          url: "/auth/all-admin",
        };
      },
      providesTags: ["admin"],
    }),
    getSingleAdmin: builder.query({
      query: (email) => {
        return {
          url: `/auth/all-admin/${email}`,
        };
      },
    }),
    deleteAdmin: builder.mutation({
      query: (email) => {
        return {
          url: `/auth/all-admin/${email}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: ({ email, updateData }) => {
        console.log("Update Admin data: ", updateData);
        return {
          url: `/auth/all-admin/${email}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useGetAllAdminQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} = authApi;
