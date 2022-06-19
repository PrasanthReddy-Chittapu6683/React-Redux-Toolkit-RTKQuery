import { configureStore } from '@reduxjs/toolkit'
import { contactApi } from '../services/contactApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [contactApi.reducerPath]: contactApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(contactApi.middleware)
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>