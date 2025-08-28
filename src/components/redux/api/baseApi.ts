import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";
import { toast } from "sonner";
import { baseApiFromEnv } from "@/components/utils/Function/baseApiFromenv";
import { sonarId } from "@/components/utils/Function/sonarId";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:7000/api",
  // baseUrl: "https://nayan-portfolio-server.vercel.app/api",
  baseUrl: `${baseApiFromEnv()}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> = async (args, api, extraOptions): Promise<any> => {
  // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
  let result: any = await baseQuery(args, api, extraOptions);
  // console.log("In Custom Base Query: ", result);

  if (result?.error?.status === 404 || result?.error?.status === 403) {
    toast.error(result?.error?.data?.message, { id: sonarId });
  }

  if (result?.error?.status === 500) {
    toast.error(result?.error?.data?.message, { id: sonarId });
  }
  if (result?.error?.status === 400) {
    // toast.error(result?.error?.data?.message, { id: sonarId });
    console.log("Result: ", result);
    toast.error(result?.error?.data?.message, { id: sonarId });
  }

  if (result.error?.status === 401) {
    toast.error(result?.error?.data?.message, { id: sonarId });
  }
  if (result.error?.status === 409) {
    toast.error(result?.error?.data?.message, { id: sonarId });
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["banner", "portfolio", "gig", "blog", "admin", "resume"],
  endpoints: () => ({}),
});
