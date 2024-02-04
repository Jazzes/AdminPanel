import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl, genreUrlPref} from "../../http/urls";
import {IGenreResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {Genre} from "../../models/Models";

export const GenreApi = createApi({
    reducerPath: 'genre',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Genre'],
    endpoints: (build) => ({
        fetchAllGenres: build.query<IGenreResponse, string>({
            query: (params) => ({
                url: `${genreUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Genre']
        }),
        fetchGenre: build.query<Genre, string>({
            query: (id) => ({
                url: `${genreUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Genre']
        }),

        createGenre: build.mutation<Genre, Genre>({
            query: (post) => ({
                url: genreUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Genre']
        }),

        changeGenre: build.mutation<Genre, Genre>({
            query: (post) => ({
                url: genreUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Genre']
        }),

        deleteGenre: build.mutation<Genre, string>({
            query: (id) => ({
                url: genreUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Genre']
        }),
    })
})