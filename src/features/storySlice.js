import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    tasks : {
        backlog : [],
        todo : [],
        progress : [],
        done : []
    }
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
        },
        setTasks : (state, action) => {
            const tasks = action.payload;
            tasks.forEach(task => state.tasks[task.category].push(task));
        },
        removeTask : (state, action) => {
            const id = action.payload.id;
            const category = action.payload.category;
            state.tasks[category].filter(task => task._id != id)
        },
        addTask : (state, action) => {
            const task = action.payload;
            state.tasks[category].push(task)
        }
    }
})

export const { setUser, setLoading, setTasks, removeTask, addTask } = storySlice.actions

export default storySlice.reducer