import { configureStore } from '@reduxjs/toolkit'
import changeTempUnitReduxReducer from './changeTempUnit/changeTempUnitRedux'

export const store = configureStore({
    reducer: {
        tempUnit: changeTempUnitReduxReducer,
    },
})