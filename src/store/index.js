import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@slices/authSlice"
import globalReducer from "@slices/globalSlice"
import { authApi } from "@api/authApi"
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        global: globalReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware)
})

setupListeners(store.dispatch);