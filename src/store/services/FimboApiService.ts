import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl, fimboUrlPref} from "../../http/urls";
import {IFimboResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {Fimbo} from "../../models/Models";

export const FimboApi = createApi({
    reducerPath: 'fimbo',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Fimbo'],
    endpoints: (build) => ({
        fetchAllFimbos: build.query<IFimboResponse, string>({
            query: (params) => ({
                url: `${fimboUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Fimbo']
        }),
        fetchFimbo: build.query<Fimbo, string>({
            query: (id) => ({
                url: `${fimboUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Fimbo']
        }),

        createFimbo: build.mutation<Fimbo, Fimbo>({
            query: (post) => ({
                url: fimboUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Fimbo']
        }),

        changeFimbo: build.mutation<Fimbo, Fimbo>({
            query: (post) => ({
                url: fimboUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Fimbo']
        }),

        deleteFimbo: build.mutation<Fimbo, string>({
            query: (id) => ({
                url: fimboUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Fimbo']
        }),
    })
})