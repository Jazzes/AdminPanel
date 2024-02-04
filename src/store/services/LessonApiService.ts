import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {
    baseUrl,
    fimboLessonLinkAddUrlPref,
    fimboLessonLinkChangeUrlPref,
    genreLessonLinkAddUrlPref, genreLessonLinkChangeUrlPref,
    lessonUrlPref
} from "../../http/urls";
import {ILessonOneResponse, ILessonResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {FimboLessonLink, GenreLessonLink, Lesson} from "../../models/Models";

export const LessonApi = createApi({
    reducerPath: 'lesson',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Lesson'],
    endpoints: (build) => ({
        fetchAllLessons: build.query<ILessonResponse, string>({
            query: (params) => ({
                url: `${lessonUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Lesson']
        }),
        fetchLesson: build.query<ILessonOneResponse, string>({
            query: (id) => ({
                url: `${lessonUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Lesson']
        }),
        createLesson: build.mutation<Lesson, Lesson>({
            query: (post) => ({
                url: lessonUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        }),

        changeLesson: build.mutation<Lesson, Lesson>({
            query: (post) => ({
                url: lessonUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        }),

        deleteLesson: build.mutation<Lesson, string>({
            query: (id) => ({
                url: lessonUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        }),

        addLessonLinks: build.mutation<FimboLessonLink[], {fimbos: number[], lesson_id: number}>({
            query: (post) => ({
                url: fimboLessonLinkAddUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        }),

        changeLessonLinks: build.mutation<FimboLessonLink[], {fimbos: number[], lesson_id: number}>({
            query: (post) => ({
                url: fimboLessonLinkChangeUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        }),

        addGenreLessonLinks: build.mutation<GenreLessonLink[], {genres: number[], lesson_id: number}>({
            query: (post) => ({
                url: genreLessonLinkAddUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        }),

        changeGenreLessonLinks: build.mutation<GenreLessonLink[], {genres: number[], lesson_id: number}>({
            query: (post) => ({
                url: genreLessonLinkChangeUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Lesson']
        })
    })
})