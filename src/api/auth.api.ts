import {api} from "@/api/api";

export interface LoginData {
    username: string;
    password: string;
}
const authApi = api.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (payload: LoginData)  => ({
                body: payload,
                url: '/auth/login',
                method: 'POST',
            })
        })
    })
})
export const {useLoginMutation} = authApi;


