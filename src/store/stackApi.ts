import { API } from "@/hooks/getEnv";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhmMTc2MzZjLWU5OTYtNDU0Yi1hMWMzLTYwY2E0YTM2MjgwMSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MTcwNjI5NSwiZXhwIjoxNzUyMzExMDk1fQ.rjOvHj7QPVMt512rcj3mLYC9It3JPC3Z4M2z3-NnhPc"

export const stacksApi = createApi({
    reducerPath: 'stacksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API
    }),
    tagTypes: ["stacks"],
    endpoints: (builder => ({
        getAllStacks: builder.query({
            query: () => ({
                method: "GET",
                url: "/stacks",
                headers: { "Authorization": `Bearer ${token}` },
            }),
            providesTags: (result) => result ? [
                ...result.data.map(() => ({ type: "stacks" as const })),
                { type: "stacks" },] : [{ type: "stacks" }],
        }),
        deleteStack: builder.mutation({
            query: (id) => ({
                method: "delete",
                url: `/stacks/${id}`,
                headers: { Authorization: `Bearer ${token}` },
            }),
            invalidatesTags: ["stacks"],
        }),
        createStack: builder.mutation({
            query: (body) => ({
                method: "post",
                url: "/stacks",
                headers: { Authorization: `Bearer ${token}` },
                body,
            }),
            invalidatesTags: ["stacks"],
        }),
        updateStack: builder.mutation({
            query: (data) => ({
                method: "patch",
                url: `/stacks/${data.id}`,
                headers: { Authorization: `Bearer ${token}` },
                body: data.body
            }),
            invalidatesTags: ["stacks"],
        }),
    }))
})

export const { useGetAllStacksQuery, useCreateStackMutation, useDeleteStackMutation, useUpdateStackMutation } = stacksApi