import './index.css'
import { useSelector } from 'react-redux'
import Card from './Card/Card.jsx';
import { 
    useEffect, 
    useState
 } from 'react';
import { TaskEdit } from '../../Modal';
import { 
    plusIcon,
    dropCloseIcon
 } from '../.../../../../assets'

function Section({ name }) {
    const tasks = useSelector(state => state.tasks[name.toLowerCase()]);
    
    const [tasksOpen, setTasksOpen] = useState([])

	const [editTask, setEditTask] = useState(0)

    useEffect(() => {
        setTasksOpen(new Array(tasks.length).fill(0))
    }, [tasks.length])
    

	const openEditTask = () => {
		setEditTask(1)
	}

    const closeEditTask = () => {
        setEditTask(0)
    }

    const closeSection = ()=>{
        setTasksOpen(new Array(tasks.length).fill(0))
    }

    const toggleTask = (idx) => {
        setTasksOpen(res=>{
            const arr = [...res]
            arr[idx] = !arr[idx]
            return arr
        })
    }

    return (
        <>
            <div className='section'>
                <div className='section__head'>
                    <p className='section__head__text'>{name}</p>
                    <div className='section__addtask'>
                        {name=='Todo' ? <img src={plusIcon} onClick={openEditTask} style={{cursor: 'pointer'}} /> : null}
                        <img src={dropCloseIcon} onClick={closeSection} style={{cursor: 'pointer'}} />
                    </div>
                </div>
                <div className='section__tasks'>
                    {tasks.map((task, idx)=><Card task={task} isOpen={tasksOpen[idx]} idx={idx} toggleTask={toggleTask} />)}
                </div>
            </div>

            {editTask && name=='Todo' ? <TaskEdit closeModal={closeEditTask} /> : null}
        </>
    )
}

export default Section