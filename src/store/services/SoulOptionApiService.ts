import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    baseUrl, soulFimboLinkAddUrlPref, soulFimboLinkChangeUrlPref, soulUrlPref
} from "../../http/urls";
import {ISoulOneResponse, ISoulResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {Soul, SoulFimboLink} from "../../models/Models";

export const SoulApi = createApi({
    reducerPath: 'soul',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Soul'],
    endpoints: (build) => ({
        fetchAllSouls: build.query<ISoulResponse, string>({
            query: (params) => ({
                url: `${soulUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Soul']
        }),
        fetchSoul: build.query<ISoulOneResponse, string>({
            query: (id) => ({
                url: `${soulUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Soul']
        }),
        createSoul: build.mutation<Soul, Soul>({
            query: (post) => ({
                url: soulUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Soul']
        }),

        changeSoul: build.mutation<Soul, Soul>({
            query: (post) => ({
                url: soulUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Soul']
        }),

        deleteSoul: build.mutation<Soul, string>({
            query: (id) => ({
                url: soulUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Soul']
        }),

        addSoulFimboLinks: build.mutation<SoulFimboLink[], { fimbos: number[], soul_option_id: number }>({
            query: (post) => ({
                url: soulFimboLinkAddUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Soul']
        }),

        changeSoulFimboLinks: build.mutation<SoulFimboLink[], { fimbos: number[], soul_option_id: number }>({
            query: (post) => ({
                url: soulFimboLinkChangeUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Soul']
        }),


    })
})