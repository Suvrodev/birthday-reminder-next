import { baseApi } from "../../api/baseApi";

interface GetAllFriendsParams {
  search?: string;
  sort?: "asc" | "desc";
  page?: number;
  limit?: number;
  ref: string; // ✅ ref is required
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
  }),
});

export const { useAddFriendMutation, useGetAllFriendsQuery } = friendsApi;
