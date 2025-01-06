import { createSlice } from '@reduxjs/toolkit'

export const changeTempUnitRedux = createSlice({
    name: 'TempUnit',
    initialState: false,

    reducers: {
        setChangeTempUnitRedux: (state, action) => {
            // console.log("action", action);
            return action.payload
        },
    },
})

export const { setChangeTempUnitRedux } = changeTempUnitRedux.actions

export default changeTempUnitRedux.reducer