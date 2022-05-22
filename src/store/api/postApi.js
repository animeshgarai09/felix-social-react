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
                return postAdapter.setAll(initState, posts)
            },
            providesTags: (result, error) => [
                ...result.ids.map(id => ({ type: "Post", id }))
            ]
        }),
        getAllBookmarks: builder.query({
            query: () => {
                return {
                    url: `/users/bookmark`,
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            transformResponse: ({ bookmarks }) => {
                return postAdapter.setAll(initState, bookmarks)
            },
            providesTags: (result, error) => [
                "Bookmarks",
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
        likePost: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/posts/like/${id}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            async onQueryStarted({ id, userDetails }, { dispatch, queryFulfilled, getState }) {
                const patchResults = []
                for (const { endpointName, originalArgs } of postApi.util.selectInvalidatedBy(getState(), [{ type: "Post", id: id }])) {
                    patchResults.push(dispatch(
                        postApi.util.updateQueryData(endpointName, originalArgs, draft => {
                            const post = endpointName === "getPost" ? draft : draft.entities[id]
                            if (post) {
                                if (!post.likes.likedBy.some((user) => user._id === userDetails._id)) {
                                    post.likes.likeCount += 1
                                    post.likes.likedBy.push(userDetails)
                                }
                            }
                        })
                    ))
                }
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log("🚀 ~ file: postApi.js ~ line 121 ~ onQueryStarted ~ err", err)
                    patchResults.forEach((result) => {
                        result.undo()
                    })
                }
            }
        }),
        disLikePost: builder.mutation({
            query: ({ id }) => {
                return {
                    url: `/posts/dislike/${id}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            async onQueryStarted({ id, userDetails }, { dispatch, queryFulfilled, getState }) {
                const patchResults = []
                for (const { endpointName, originalArgs } of postApi.util.selectInvalidatedBy(getState(), [{ type: "Post", id: id }])) {
                    patchResults.push(dispatch(
                        postApi.util.updateQueryData(endpointName, originalArgs, draft => {
                            const post = endpointName === "getPost" ? draft : draft.entities[id]
                            if (post) {
                                if (post.likes.likedBy.some((user) => user._id === userDetails._id)) {
                                    post.likes.likeCount -= 1
                                    const updatedData = post.likes.likedBy.filter((user) => user._id !== userDetails._id)
                                    post.likes.likedBy = updatedData
                                }
                            }
                        })
                    ))
                }

                try {
                    await queryFulfilled
                } catch (err) {
                    console.log("🚀 ~ file: postApi.js ~ line 121 ~ onQueryStarted ~ err", err)
                    patchResults.forEach((result) => {
                        result.undo()
                    })
                }
            }
        }),
    })
})

export const selectPostsResult = postApi.endpoints.getAllPosts.select()
export const selectBookmarksResult = postApi.endpoints.getAllBookmarks.select()

export const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)
export const selectBookmarksData = createSelector(
    selectBookmarksResult,
    BookmarksResult => BookmarksResult.data
)

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postAdapter.getSelectors(state => selectPostsData(state) ?? initState)

export const {
    selectAll: selectAllBookmarks,
} = postAdapter.getSelectors(state => selectBookmarksData(state) ?? initState)

export const {
    useCreatePostMutation,
    useGetAllPostsQuery,
    useGetAllPostsByUsernameQuery,
    useGetPostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useDisLikePostMutation,
    useGetAllBookmarksQuery
} = postApi