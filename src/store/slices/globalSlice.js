import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isReactionModalOpen: false,
    reactionData: []
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setReactionState: (state, { payload }) => {
            state.isReactionModalOpen = true
            state.reactionData = payload
        },
        resetReactionState: (state) => {
            state.isReactionModalOpen = false
            state.reactionData = []
        },
    }
})

export const { setReactionState, resetReactionState } = globalSlice.actions

export const selectReactionState = (state) => [state.global.isReactionModalOpen, state.global.reactionData]

export default globalSlice.reducer
