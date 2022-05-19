/* eslint-disable no-labels */
import { baseApi } from "./baseApi"
import authCookieHandler from "@global/js/authCookieHandler"

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
            }
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
            }
        })
    })
})

export const {
    useGetUserDetailsQuery,
    useEditUserDetailsMutation,
    useFollowMutation,
    useUnfollowMutation } = userApi