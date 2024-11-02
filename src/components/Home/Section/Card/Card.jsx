import {
    threeDotIcon,
    dropDownIcon,
    dropUpIcon,
    checkIcon
} from '../../../../assets'
import './index.css'
import { useDispatch, useSelector } from 'react-redux'
import {
    useEffect,
    useRef,
    useState
} from 'react'
import {
    TaskEdit,
    DeleteModal
} from '../../../Modal'
import axios from 'axios'
import {
    addTask,
    checkUncheck,
    removeTask
} from '../../../../features/storySlice.js'
import { toast } from 'react-toastify'
const apiUrl = import.meta.env.VITE_SERVER_API
const clientUrl = import.meta.env.VITE_CLIENT_API

function Card({ task, isOpen, toggleTask }) {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const ref = useRef()

    const [checkCnt, setCheckCnt] = useState(0)
    const [editTask, setEditTask] = useState("")
    const [optionOpen, setOptionOpen] = useState(0)
    const [deleteModal, setDeletModal] = useState(0)

    useEffect(() => {
        setCheckCnt(() => {
            let cnt = 0;
            task.checklist.forEach(x => cnt += x.isDone);
            return cnt;
        })
    }, [task.checklist])


    const convertDate = (date) => {
        const dateStr = new Date(task.dueDate).toDateString().split(" ");
        return `${dateStr[1]} ${dateStr[2]}`
    }

    const openEditTask = () => {
        toggleOptions()
        setEditTask(task._id)
    }

    const closeEditTask = () => {
        setEditTask("")
    }

    const openDeleteModal = () => {
        toggleOptions()
        setDeletModal(1)
    }

    const closeDeleteModal = () => {
        setDeletModal(0)
    }

    const toggleOptions = () => {
        setOptionOpen(!optionOpen)
    }

    const updateCategory = async (e) => {
        const category = e.target.value
        ref.current.style.pointerEvents = 'none'
        try {
            await axios.patch(`${apiUrl}/task/category/${task._id}`, { category }, {
                withCredentials: true
            })
            const updatedTask = { ...task, category }
            dispatch(removeTask(task))
            dispatch(addTask(updatedTask))
        } catch (error) {
            if(error.response?.data?.statusCode == 403) {
                dispatch(removeTask(task))
                toast.error(error.response?.data?.message || error.message)
            }
            console.log(error.response?.data?.message || error.message)
        }
        ref.current.style.pointerEvents = 'auto'
    }

    const copyTaskLink = () => {
        navigator.clipboard.writeText(`${clientUrl}/task?key=${task._id}`)
        toast.success('link copied')
    }

    const toggleCheck = async (e) => {
        const checklist = e.currentTarget.dataset.id
        ref.current.style.pointerEvents = 'none'
        try {
            await axios.patch(`${apiUrl}/task/mark`, {
                task: task._id,
                checklist
            }, { withCredentials: true })
            dispatch(checkUncheck({ taskId: task._id, checklistId: checklist, category: task.category }))
        } catch (error) {
            if(error.response?.data?.statusCode == 403) {
                dispatch(removeTask(task))
                toast.error(error.response?.data?.message || error.message)
            }
            console.log(error.response?.data?.message || error.message);
        }
        ref.current.style.pointerEvents = 'auto'
    }

    const dateCompare = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const taskDate = new Date(task.dueDate)
        taskDate.setHours(0, 0, 0, 0)

        return taskDate.getTime() < date.getTime()
    }

    return (
        <>
            <div className='card' ref={ref}>
                <div className='card__head'>
                    <div className='card__flex' style={{ position: 'relative' }}>
                        <div className='card__flex' style={{ gap: '5px' }}>
                            <div className={`card__priority__dot card__priority--${task.priority}`} />
                            <p className='card__priority__text'>{task.priority.toUpperCase()} PRIORITY</p>
                            { task.assignedBy._id != user._id ?
                                <div className='card__flex card__assigned'>
                                    {task.assignedBy.name.slice(0,2).toUpperCase()}
                                </div> 
                            : null }
                        </div>
                        <img src={threeDotIcon} onClick={toggleOptions} style={{ cursor: 'pointer' }} />
                        {optionOpen ? <div className='card__options'>
                            <button className='card__options__btn' onClick={openEditTask}>Edit</button>
                            <button className='card__options__btn' onClick={copyTaskLink}>Share</button>
                            <button className='card__options__btn' style={{ color: '#CF3636' }} onClick={openDeleteModal}>Delete</button>
                        </div> : null}
                    </div>
                    <div className='card__title'>
                        {task.title.slice(0, 50) + (task.title.length > 50 ? "..." : "")}
                        {task.title.length > 50 ? <p className='card__title__text'>{task.title}</p> : null}
                    </div>
                </div>

                <div className='card__flex'>
                    <p className='card__checklist__title'>Checklist ({checkCnt}/{task.checklist.length})</p>
                    <img src={isOpen ? dropUpIcon : dropDownIcon} onClick={() => toggleTask(task._id)} style={{ cursor: 'pointer' }} />
                </div>

                <div className='card__checklist'>
                    {isOpen ? task.checklist.map(todo =>
                        <div className='card__checklist__element' key={todo._id}>
                            <div className={`card__checklist__checkbox card__checklist__checkbox--${todo.isDone ? '1' : '0'} card__flex`} style={{ justifyContent: 'center', cursor: 'pointer' }} onClick={toggleCheck} data-id={todo._id}>
                                <img src={checkIcon} />
                            </div>
                            <p className='card__checklist__text'>{todo.text}</p>
                        </div>
                    ) : null}
                </div>

                <div className='card__flex'>
                    <div>
                        {task.dueDate ? <button className={`card__btn ${task.category != 'done' && (dateCompare() || task.priority === 'high') ? "card__btn--red" : task.category === 'done' ? "card__btn--green" : ""}`}>{convertDate(task.dueDate)}</button> : null}
                    </div>
                    <div className='card__flex' style={{ gap: '5px' }}>
                        {['backlog', 'todo', 'progress', 'done'].map(x => x != task.category ? <button className='card__btn' onClick={updateCategory} value={x} key={x}>{x.toUpperCase()}</button> : null)}
                    </div>
                </div>

            </div >

            {editTask ? <TaskEdit closeModal={closeEditTask} edit={1} currTask={task} /> : null}
            {deleteModal ? <DeleteModal closeModal={closeDeleteModal} mode={"Delete"} task={task} /> : null}
        </>
    )
}

export default Card