import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
    name: 'location',
    initialState: false,

    reducers: {
        setSearch: (state) => {return true}
            // console.log("action",action)
            
        
        ,
    },
})

export const { setSearch } = locationSlice.actions

export default locationSlice.reducer