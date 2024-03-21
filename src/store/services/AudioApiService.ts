import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {audioUrlPref, baseUrl} from "../../http/urls";
import {IAudioResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {Audio} from "../../models/Models";

export const AudioApi = createApi({
    reducerPath: 'audio',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Audio'],
    endpoints: (build) => ({
        fetchAllAudios: build.query<IAudioResponse, string>({
            query: (params) => ({
                url: `${audioUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Audio']
        }),
        fetchAudio: build.query<Audio, string>({
            query: (id) => ({
                url: `${audioUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Audio']
        }),

        createAudio: build.mutation<Audio, Audio>({
            query: (post) => ({
                url: audioUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Audio']
        }),

        changeAudio: build.mutation<Audio, Audio>({
            query: (post) => ({
                url: audioUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Audio']
        }),

        deleteAudio: build.mutation<Audio, string>({
            query: (id) => ({
                url: audioUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Audio']
        }),
    })
})