import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import { authApi } from "@api/authApi"
import { userApi } from "@api/userApi"
import authCookieHandler from "@global/js/authCookieHandler"

const cookieHandler = authCookieHandler()

const followersAdapter = createEntityAdapter({
    // Assume IDs are stored in a field other than `book.id`
    selectId: (follower) => follower._id,
})

// const followersAdapter = createEntityAdapter({
//     // Assume IDs are stored in a field other than `book.id`
//     selectId: (following) => following._id,
// })

const initialState = {
    user: {
        followers: followersAdapter.getInitialState(),
        following: followersAdapter.getInitialState()
    },
    token: null,
}

const handleAuthCookie = authCookieHandler()

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser: (state, { payload }) => {
            state.user = payload
        },
        logout: (state) => {
            state.user = {
                followers: followersAdapter.getInitialState(),
                following: followersAdapter.getInitialState()
            }
            state.token = null
            cookieHandler.clearUserDetails()
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.signup.matchFulfilled,
            (state, { payload }) => {
                handleAuthCookie.setUserDetails({ token: payload.encodedToken, username: payload.createdUser.username })
                const { followers, following, ...rest } = payload.createdUser
                state.token = payload.encodedToken;
                state.user = { ...rest, ...state.user }
                followersAdapter.setAll(state.user.followers, payload.createdUser.followers)
                followersAdapter.setAll(state.user.following, payload.createdUser.following)
            }
        ).addMatcher(
            authApi.endpoints.signin.matchFulfilled,
            (state, { payload }) => {
                handleAuthCookie.setUserDetails({ token: payload.encodedToken, username: payload.foundUser.username })
                const { followers, following, ...rest } = payload.foundUser
                state.token = payload.encodedToken;
                state.user = { ...rest, ...state.user }
                followersAdapter.setAll(state.user.followers, payload.foundUser.followers)
                followersAdapter.setAll(state.user.following, payload.foundUser.following)
            }
        ).addMatcher(
            authApi.endpoints.verify.matchFulfilled,
            (state, { payload }) => {
                handleAuthCookie.setUserDetails({ token: payload.encodedToken, username: payload.user.username })
                const { followers, following, ...rest } = payload.user
                state.token = payload.encodedToken;
                state.user = { ...rest, ...state.user }
                followersAdapter.setAll(state.user.followers, payload.user.followers)
                followersAdapter.setAll(state.user.following, payload.user.following)
            }
        ).addMatcher(
            userApi.endpoints.editUserDetails.matchFulfilled,
            (state, { payload }) => {
                state.user = payload.user;
            }
        ).addMatcher(
            userApi.endpoints.follow.matchFulfilled,
            (state, { payload }) => {
                followersAdapter.upsertOne(state.user.following, payload.followUser)
            }
        ).addMatcher(
            userApi.endpoints.unfollow.matchFulfilled,
            (state, { payload }) => {
                followersAdapter.removeOne(state.user.following, payload.followUser._id)
            }
        )
    },
})

export const { logout, updateUser } = authSlice.actions

export const {
    selectAll: selectAllFollowers,
    selectById: selectFollowerById,
    selectTotal: followerCount,
} = followersAdapter.getSelectors(state => {
    return state.auth.user.followers
})

export const {
    selectAll: selectAllFollowings,
    selectById: selectFollowingsById,
    selectTotal: followingsCount,
} = followersAdapter.getSelectors(state => {
    return state.auth.user.following
})
export const selectUser = (state) => state.auth.user
export default authSlice.reducer