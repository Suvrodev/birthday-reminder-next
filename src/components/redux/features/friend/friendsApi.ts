import { baseApi } from "../../api/baseApi";

export interface GetAllFriendsParams {
  ref: string;
  search?: string;
  sort?: "asc" | "desc";
  sortBy?: "date" | "name" | "rating"; // <-- এখানে যোগ করো
  page?: number;
  limit?: number;
}

const friendsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFriend: builder.mutation({
      query: (adminInfo) => ({
        url: "/friend",
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["friend"],
    }),

    // 📜 Get All Friends (with search, sort, pagination)
    getAllFriends: builder.query({
      query: ({
        search = "",
        sort = "asc",
        page = 1,
        limit = 10,
        ref,
      }: GetAllFriendsParams) => ({
        url: `/friend?search=${search}&sort=${sort}&page=${page}&limit=${limit}&ref=${ref}`,
        method: "GET",
      }),
      providesTags: ["friend"],
    }),

    // 📜 Get All Friends Image
    getAllFriendsImage: builder.query({
      query: ({ ref }: GetAllFriendsParams) => ({
        url: `/friend/image?&ref=${ref}`,
        method: "GET",
      }),
      providesTags: ["friend"],
    }),

    getSingleFriend: builder.query({
      query: (id: string) => {
        console.log("ID:", id);
        return {
          url: `/friend/single/${id}`,
          method: "GET",
        };
      },
    }),

    deleteFriend: builder.mutation({
      query: ({ id }) => {
        console.log("in redux id");
        return {
          url: `/friend/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["friend"],
    }),
    updateFriend: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/friend/update/${id}`,
          method: "PATCH",
          body: updateData,
        };
      },
      invalidatesTags: ["friend"],
    }),
  }),
});

export const {
  useAddFriendMutation,
  useGetAllFriendsQuery,
  useGetSingleFriendQuery,
  useDeleteFriendMutation,
  useUpdateFriendMutation,
} = friendsApi;
