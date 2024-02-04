import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl, lessonTypeUrlPref} from "../../http/urls";
import {ILessonTypeResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {LessonType} from "../../models/Models";

export const LessonTypeApi = createApi({
    reducerPath: 'lessonType',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['LessonType'],
    endpoints: (build) => ({
        fetchAllLessonTypes: build.query<ILessonTypeResponse, string>({
            query: (params) => ({
                url: `${lessonTypeUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['LessonType']
        }),
        fetchLessonType: build.query<LessonType, string>({
            query: (id) => ({
                url: `${lessonTypeUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['LessonType']
        }),

        createLessonType: build.mutation<LessonType, LessonType>({
            query: (post) => ({
                url: lessonTypeUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['LessonType']
        }),

        changeLessonType: build.mutation<LessonType, LessonType>({
            query: (post) => ({
                url: lessonTypeUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['LessonType']
        }),

        deleteLessonType: build.mutation<LessonType, string>({
            query: (id) => ({
                url: lessonTypeUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['LessonType']
        }),
    })
})