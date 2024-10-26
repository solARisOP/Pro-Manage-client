import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true
}

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setUser : (state, action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
})

export const { setUser, setLoading } = storySlice.actions

export default storySlice.reducer