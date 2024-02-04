import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl, variableUrlPref} from "../../http/urls";
import {IVariableResponse} from "../../models/StoreModels";
import {getCookie} from "../../http/cookies";
import {Variable} from "../../models/Models";

export const VariableApi = createApi({
    reducerPath: 'variable',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl
    }),
    tagTypes: ['Variable'],
    endpoints: (build) => ({
        fetchAllVariables: build.query<IVariableResponse, string>({
            query: (params) => ({
                url: `${variableUrlPref}${params && "?" + params}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Variable']
        }),
        fetchVariable: build.query<Variable, string>({
            query: (id) => ({
                url: `${variableUrlPref}/${id}`,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            providesTags: () => ['Variable']
        }),

        createVariable: build.mutation<Variable, Variable>({
            query: (post) => ({
                url: variableUrlPref,
                method: "POST",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Variable']
        }),

        changeVariable: build.mutation<Variable, Variable>({
            query: (post) => ({
                url: variableUrlPref,
                method: "PUT",
                body: post,
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Variable']
        }),

        deleteVariable: build.mutation<Variable, string>({
            query: (id) => ({
                url: variableUrlPref,
                method: "DELETE",
                body: {id},
                headers: {
                    "Authorization": `Bearer ${getCookie('token')}`
                }
            }),
            invalidatesTags: ['Variable']
        }),
    })
})