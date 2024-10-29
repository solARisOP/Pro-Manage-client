import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    feedTimeline: 'week',
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
            state.tasks = {
                backlog : [],
                todo : [],
                progress : [],
                done : []
            }
            tasks.forEach(task => state.tasks[task.category].push(task));
        },
        removeTask : (state, action) => {
            const task = action.payload;
            state.tasks[task.category] = state.tasks[task.category].filter(x => x._id != task._id)
        },
        addTask : (state, action) => {
            const task = action.payload;
            state.tasks[task.category].push(task)
        },
        changeTimeline : (state, action) => {
            const timeline = action.payload;
            state.feedTimeline = timeline
        }
    }
})

export const { setUser, setLoading, setTasks, removeTask, addTask, changeTimeline } = storySlice.actions

export default storySlice.reducer