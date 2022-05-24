import { baseApi } from "./baseApi"
import { postApi } from "./postApi"
import authCookieHandler from "@global/js/authCookieHandler"
const cookieHandler = authCookieHandler()

export const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addCommentToPost: builder.mutation({
            query: ({ id, commentData }) => ({
                url: `/comments/add/${id}`,
                method: "POST",
                headers: {
                    authorization: cookieHandler.getUserDetails().token
                },
                body: {
                    commentData: {
                        _id: commentData._id,
                        text: commentData.text
                    }
                }
            }),
            async onQueryStarted({ id, commentData }, { dispatch, queryFulfilled, getState }) {
                const patchResults = []
                for (const { endpointName, originalArgs } of postApi.util.selectInvalidatedBy(getState(), [{ type: "Post", id: id }])) {
                    patchResults.push(dispatch(
                        postApi.util.updateQueryData(endpointName, originalArgs, draft => {
                            const post = endpointName === "getPost" ? draft : draft.entities[id]
                            if (post) {
                                post.comments.push(commentData)
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
        deleteCommentFromPost: builder.mutation({
            query: ({ postId, commentId }) => ({
                url: `/comments/delete/${postId}/${commentId}`,
                method: "POST",
                headers: {
                    authorization: cookieHandler.getUserDetails().token
                },
            }),
            async onQueryStarted({ postId, commentId }, { dispatch, queryFulfilled, getState }) {
                const patchResults = []
                for (const { endpointName, originalArgs } of postApi.util.selectInvalidatedBy(getState(), [{ type: "Post", id: postId }])) {
                    patchResults.push(dispatch(
                        postApi.util.updateQueryData(endpointName, originalArgs, draft => {
                            const post = endpointName === "getPost" ? draft : draft.entities[postId]
                            if (post) {
                                const filteredData = post.comments.filter(comment => comment._id !== commentId)
                                post.comments = filteredData
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
        updateCommentToPost: builder.mutation({
            query: ({ postId, commentData }) => ({
                url: `/comments/edit/${postId}/${commentData.id}`,
                method: "POST",
                headers: {
                    authorization: cookieHandler.getUserDetails().token
                },
                body: {
                    commentData: commentData.text
                }
            }),
            async onQueryStarted({ postId, commentData }, { dispatch, queryFulfilled, getState }) {
                const patchResults = []
                for (const { endpointName, originalArgs } of postApi.util.selectInvalidatedBy(getState(), [{ type: "Post", id: postId }])) {
                    patchResults.push(dispatch(
                        postApi.util.updateQueryData(endpointName, originalArgs, draft => {
                            const post = endpointName === "getPost" ? draft : draft.entities[postId]
                            if (post) {
                                const index = post.comments.findIndex(comment => comment._id === commentData.id)
                                post.comments[index].text = commentData.text
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
        })
    })

})

export const {
    useAddCommentToPostMutation,
    useDeleteCommentFromPostMutation,
    useUpdateCommentToPostMutation
} = commentApi