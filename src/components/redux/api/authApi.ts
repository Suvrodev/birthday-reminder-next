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
    getMe: builder.query({
      query: (email: string) => ({
        url: `/login/me/${email}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ email, updateData }) => {
        console.log("Update Admin data: ", updateData);
        return {
          url: `/login/update/${email}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: () => {
        return {
          url: "/login/all-user",
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useUpdateUserMutation,
  useGetAllUserQuery,
} = authApi;
