import { baseApi } from "./baseApi"
import authCookieHandler from "@global/js/authCookieHandler"
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
const cookieHandler = authCookieHandler()

const postAdapter = createEntityAdapter({
    selectId: (post) => post._id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
})

const initState = postAdapter.getInitialState()

export const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => {
                return {
                    url: "/posts",
                }
            },
            transformResponse: ({ posts }) => {
                return postAdapter.setAll(initState, posts)
            },
            providesTags: (result, error) => [
                { type: "Post", id: "List" },
                ...result.ids.map(id => ({ type: "Post", id }))
            ]
        }),
        getPost: builder.query({
            query: (postId) => {
                return {
                    url: `/posts/${postId}`,
                }
            },
            transformResponse: ({ post }) => post,
            providesTags: (result, error, arg) => {
                return [{ type: "Post", id: arg }]
            }
        }),
        getAllPostsByUsername: builder.query({
            query: (username) => {
                return {
                    url: `/posts/user/${username}`,
                }
            },
            transformResponse: ({ posts }) => {
                console.log("🚀 ~ file: postApi.js ~ line 47 ~ posts", posts)
                return postAdapter.setAll(initState, posts)
            },
            providesTags: (result, error) => [
                ...result.ids.map(id => ({ type: "Post", id }))
            ]
        }),
        createPost: builder.mutation({
            query: (postData) => {
                return {
                    url: "/posts",
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                    body: { postData }
                }
            },
            invalidatesTags: [{ type: "Post", id: "List" }]
        }),
        updatePost: builder.mutation({
            query: (postData) => {
                console.log("🚀 ~ file: postApi.js ~ line 7 ~ body", postData)
                return {
                    url: `/posts/edit/${postData.id}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                    body: { postData: postData.data }
                }
            },
            invalidatesTags: (result, error, arg) => {
                return [{ type: "Post", id: arg.id }]
            }
        }),
        deletePost: builder.mutation({
            query: (id) => {
                return {
                    url: `/posts/${id}`,
                    method: "DELETE",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            invalidatesTags: (result, error, arg) => {
                return [{ type: "Post", id: arg }]
            }
        }),
    })
})

export const selectPostsResult = postApi.endpoints.getAllPosts.select()

export const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postAdapter.getSelectors(state => selectPostsData(state) ?? initState)

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetAllPostsByUsernameQuery,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation
} = postApi