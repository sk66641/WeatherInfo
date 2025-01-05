import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './location/location'

export const store = configureStore({
    reducer: {
        location: locationReducer,
    },
})