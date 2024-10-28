import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Home from "./components/Home/Home.jsx"
import Auth from "./components/Auth/Auth.jsx"
import Analytics from "./components/Analytics/Analytics.jsx"
import Update from "./components/Update/Update.jsx"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser, setTasks } from "./features/storySlice.js"

const apiUrl = import.meta.env.VITE_SERVER_API

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchUserAndTasks = async() => {
			try {
				const res = await Promise.all([
					axios.get(`${apiUrl}/user`, { withCredentials: true }), 
					axios.get(`${apiUrl}/feed/week`, { withCredentials: true })
				])
				const {data : {data : {user}}} = res[0];
				const {data : {data}} = res[1]

				dispatch(setUser(user))
				dispatch(setTasks(data))
			} catch (error) {
				console.log(error.response?.data?.message || error.message);
			}
		}		
		fetchUserAndTasks()
	}, [])
	
	return (
		<>
			<Sidebar />
			<Home />
		</>
	)
}

export default App
