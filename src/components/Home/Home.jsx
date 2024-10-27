import Header from "./Header/Header.jsx"
import './index.css'
import TaskEdit from "../Modal/TaskEdit/TaskEdit.jsx"
import { useState } from "react"

function Home() {

	const [editTask, setEditTask] = useState(1)

	const toggleEditTask = (x) => {
		setEditTask(x)
	}

	return (
		<>
			<div className='home'>
				<Header />
				<div>

				</div>
			</div>

			{editTask ? <TaskEdit toggleModal={toggleEditTask} edit={1} idx={'671e8528b0a1f561efcecb77'} /> : null}
		</>
	)
}

export default Home