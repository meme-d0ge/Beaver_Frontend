import {api} from "@/api/api";

interface changeProfileData {
    avatar?: Blob,
    displayName?: string,
    bio?: string,
    deleteAvatar?: boolean,
}

export const profileApi = api.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => '/profiles',
        }),
        getProfileByUsername: builder.query({
            query: username => `/profiles/${username}`,
        }),
        changeProfile: builder.mutation({
            query: (payload: changeProfileData)  => {
                const formData = new FormData()
                if (payload.avatar) {
                    formData.append('avatar', payload.avatar)
                }
                if (payload.displayName) {
                    formData.append('displayName', payload.displayName)
                }
                if (payload.bio) {
                    formData.append('bio', payload.bio)
                }
                if (payload.deleteAvatar) {
                    formData.append('deleteAvatar', payload.deleteAvatar ? 'true' : 'false')
                }

                return {
                    body: formData,
                    url: '/profiles',
                    method: 'POST',
                };
            }
        }),
    })
})

export const { useGetProfileQuery, useGetProfileByUsernameQuery } = profileApi;