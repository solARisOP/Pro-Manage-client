import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { 
	setUser, 
	setTasks,
	setLoading
 } from "./features/storySlice.js"
import { Outlet } from "react-router-dom"

const apiUrl = import.meta.env.VITE_SERVER_API

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUserAndTasks = async() => {
			try {
				const res = await Promise.all([
					axios.get(`${apiUrl}/user`, { withCredentials: true }), 
					axios.get(`${apiUrl}/feed?timeline=week`, { withCredentials: true })
				])
				const {data : {data : user}} = res[0];
				const {data : {data : tasks}} = res[1]

				dispatch(setUser(user))
				dispatch(setTasks(tasks))
			} catch (error) {
				console.log(error.response?.data?.message || error.message);
			}
			dispatch(setLoading(0))
		}		
		fetchUserAndTasks()
	}, [])
	
	return (
		<Outlet/>
	)
}

export default App
