import Header from "./Header/Header.jsx"
import './index.css'
import TaskEdit from "../Modal/TaskEdit/TaskEdit.jsx"
import { useState } from "react"
import Section from "./Section/Section.jsx"

function Home() {
	const [editTask, setEditTask] = useState(1)

	const toggleEditTask = (x) => {
		setEditTask(x)
	}

	return (
		<>
			<div className='home'>
				<Header />
				<div className="home__body">
					<Section name="Backlog" />
					<Section name="Todo" />
					<Section name="Progress" />
					<Section name="Done" />
				</div>
			</div>

			{/* {editTask ? <TaskEdit toggleModal={toggleEditTask} /> : null} */}
			{/* {editTask ? <TaskEdit toggleModal={toggleEditTask} edit={1} idx={'671f346c6add97a9fb07e795'} /> : null} */}
		</>
	)
}

export default Home