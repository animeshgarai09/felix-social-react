/* eslint-disable no-labels */
import { baseApi } from "./baseApi"
import authCookieHandler from "@global/js/authCookieHandler"
import { setBookmarks } from "@slices/authSlice"
const cookieHandler = authCookieHandler()

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            providesTags: ["user"],
            query: (username) => ({
                url: `/users/${username}`,
            }),
            transformResponse: (data) => {
                return data.user
            }
        }),
        editUserDetails: builder.mutation({
            query: (userData) => {
                return {
                    url: `/users/edit`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                    body: {
                        userData: userData
                    }
                }
            },
            invalidatesTags: ["user"],
        }),
        follow: builder.mutation({
            query: (userId) => {
                return {
                    url: `/users/follow/${userId}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            invalidatesTags: ["user"]
        }),
        unfollow: builder.mutation({
            query: (userId) => {
                return {
                    url: `/users/unfollow/${userId}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            invalidatesTags: ["user"]
        }),
        bookmarkPost: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/bookmark/${id}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            invalidatesTags: ["Bookmarks"],
            async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
                const patchResults = dispatch(setBookmarks({ type: "add", data: id }))
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log("🚀 ~ file: postApi.js ~ line 121 ~ onQueryStarted ~ err", err)
                    patchResults.undo()
                }
            }
        }),
        removePostBookmark: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/remove-bookmark/${id}`,
                    method: "POST",
                    headers: {
                        authorization: cookieHandler.getUserDetails().token
                    },
                }
            },
            invalidatesTags: ["Bookmarks"],
            async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
                let temp = getState().auth.user.bookmarks
                temp = temp.filter((bId) => bId !== id)
                console.log("🚀 ~ file: userApi.js ~ line 91 ~ onQueryStarted ~ temp", temp)
                const patchResults = dispatch(setBookmarks({ data: temp }))
                try {
                    await queryFulfilled
                } catch (err) {
                    console.log("🚀 ~ file: postApi.js ~ line 121 ~ onQueryStarted ~ err", err)
                    patchResults.undo()
                }
            }
        })
    })
})

export const {
    useGetUserDetailsQuery,
    useEditUserDetailsMutation,
    useFollowMutation,
    useUnfollowMutation,
    useBookmarkPostMutation,
    useRemovePostBookmarkMutation
} = userApi