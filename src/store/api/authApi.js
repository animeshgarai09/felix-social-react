/* eslint-disable no-labels */
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body
            })
        }),
        signin: builder.mutation({
            query: (body) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body
                }
            }
        }),
        verify: builder.mutation({
            query: (token) => {
                return {
                    url: "/auth/verify",
                    method: "POST",
                    headers: {
                        authorization: token
                    }
                }
            }
        })
    })
})


export const { useSignupMutation, useSigninMutation, useVerifyMutation } = authApi 