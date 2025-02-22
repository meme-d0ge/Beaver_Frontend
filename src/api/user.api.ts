import {api} from "@/api/api";

export interface RegisterData {
    displayName: string;
    username: string;
    password: string;
}
export interface PatchData {
    password: string,
    newPassword: string,
}
export interface DeleteData {
    password: string,
    newPassword: string,
}

export const userApi = api.injectEndpoints({
    endpoints: builder => ({
        getUser: builder.query({
            query: () => '/users',
        }),
        registerUser: builder.mutation({
            query: (payload: RegisterData)  => ({
                body: payload,
                url: '/users',
                method: 'POST',
            })
        }),
        patchUser: builder.mutation({
            query: (payload: PatchData) => ({
                body: payload,
                url: '/users',
                method: 'PATCH',
            })
        }),
        deleteUser: builder.mutation({
            query: (payload: DeleteData) => ({
                body: payload,
                url: '/users',
                method: 'DELETE',
            })
        })
    })
})
export const { useGetUserQuery, useRegisterUserMutation, usePatchUserMutation, useDeleteUserMutation } = userApi
