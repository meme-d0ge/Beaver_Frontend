import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = String(process.env.NEXT_PUBLIC_BASE_URL)
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        credentials: 'include',
        baseUrl: `${API_URL}/api`,
    }),
    endpoints: () => ({}),
});
// export const { useGetUserQuery } = api